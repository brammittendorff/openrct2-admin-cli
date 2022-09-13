#!/usr/bin/env node

const { GameServer } = require('./gameserver.js');
const yargs = require('yargs');

const argv = yargs
    .command('details', 'This will get the details of your park')
    .command('users', 'This will get the users of your park')
    .command('groups', 'This will get the groups of your park')
    .command('run', 'This will run the command you enter', {
        command: {
            alias: 'c',
            description: 'Run the following command',
            type: 'string',
        }
    })
    .option("n", {
        alias: "hostname",
        describe: "A hostname to overrule 127.0.0.1",
        type: 'string',
    })
    .help()
    .alias('help', 'h').argv;

let server = {
    hostname: '127.0.0.1'
};
if (argv.hostname) {
    server = {
        hostname: argv.hostname
    };
}

const myGameServer = new GameServer(server);

if (argv._.includes('details')) {
    myGameServer.getDetails().then(function (results) {
        console.log(results);
    });
}

if (argv._.includes('users')) {
    myGameServer.getDetails().then(function (results) {
        console.log(results.network.players);
    });
}

if (argv._.includes('groups')) {
    myGameServer.getDetails().then(function (results) {
        console.log(results.network.groups);
    });
}

if (argv.command) {
    try {
        if (!(myGameServer.execute(argv.command))) {
            console.log(`Error sending command: ${argv.command}`);
        } else {
            console.log(`Command sent succesfully: "${argv.command}"`);
        }
    }
    catch (ex) {
        console.log(`Error sending command: ${ex}`);
    }
}

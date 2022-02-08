const net = require('net');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const moment = require('moment');
const REMOTEPORT = 35711;

class GameServer {
    constructor(server = {}) {
        this._hostname = server.hostname || '127.0.0.1';
        this._port = server.port || REMOTEPORT;
        this._details = null;
        console.log("Server config:");
        console.log(this);
    }

    async getDetails(force=false) {
        try {
            let d = moment();
            if (force || !this._details || d.isAfter(this._details.expiration)) {
                if (this._details = await this.execute('park')) {
                    this._details.expiration = d.add(2, 'minutes');
                }
            }
        }
        catch (ex) {
            console.log(`Error getting server details: ${ex}`);
        }
        return this._details;
    }

    async execute(command) {
        return new Promise((resolve, reject) => {
            try {
                var client = new net.Socket();
                client.connect(this._port, this._hostname, function () {
                    client.write(typeof command === 'object' ? JSON.stringify(command) : command);
                });

                client.on('data', function (data) {
                    resolve(JSON.parse(data));
                    client.destroy();
                });

                client.on('close', function () {
                    resolve(null);
                });

                client.on('error', function (ex) {
                    reject(ex);
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
}

module.exports = {
    GameServer,
};

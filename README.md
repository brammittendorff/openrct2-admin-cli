# Admin cli for OpenRCT2

We had the problem that we maintained many linux servers and we could not remotely execute commands to becomse admin. So we created a CLI to maintain servers for OpenRCT2 with the minimum effort.

## Installation

You can use this application when you install the [openrct2-remote-control](https://github.com/CorySanin/openrct2-remote-control) plugin in the `plugins` directory.

For the installation procedure please read the [readme](https://github.com/CorySanin/openrct2-remote-control/blob/master/README.md) file of that project.


## Building the image

Run this admin cli by your terminal you first need to build it.

```bash
docker build -t openrct2-admin-cli .   
```


## Usage

### Help command

To run this image remember you will need the `host` network settings so to run this you can execute:

```bash
docker run -it --network host openrct2-admin-cli:latest ./main.js --help
```

This will result in:

```bash
main.js [command]

Commands:
  main.js details  This will get the details of your park
  main.js users    This will get the uesrs of your park
  main.js groups   This will get the groups of your park
  main.js run      This will run the command you enter

Options:
      --version   Show version number                                  [boolean]
  -n, --hostname  A hostname to overrule 127.0.0.1                      [string]
  -h, --help      Show help                                            [boolean]
```

### View users

To view the users you can run:

```bash
docker run -it --network host openrct2-admin-cli:latest ./main.js users
```

This could result in:

```json
[
  { id: 0, group: 0, name: 'bram', ping: 0, hash: '', ip: '' },
  {
    id: 1,
    group: 0,
    name: 'bram #2',
    ping: 50,
    hash: '1337hashoftheuser',
    ip: '1.3.3.7'
  }
]
```

### View groups

To view the groups you can run:

```bash
docker run -it --network host openrct2-admin-cli:latest ./main.js groups
```

This could result in:

```json
[
  { id: 0, name: 'Admin' },
  { id: 1, name: 'Spectator' },
  { id: 2, name: 'User' }
]
```

### Give the user admin permission

Remember in the view groups section the admin group id was `0` so with the hash of the user and the admin id you can execute the following command:

```bash
docker run -it --network host openrct2-admin-cli:latest ./main.js run -c "update player 1337hashoftheuser 0"
```

This could result in:

```bash
Command sent succesfully: "update player 1337hashoftheuser 0"
```

## Docker

To run this in docker and if you run the openrct2-cli also in docker you can use the pushed docker image:

```bash
 docker run -it ghcr.io/brammittendorff/openrct2-admin-cli:main ./main.js -n $(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $(docker ps | grep openrct2-cli | awk '{print $1}')) run -c 'say hi'
```
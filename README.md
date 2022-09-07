# RobloxWS

[![Npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://https://npmjs.com/) [![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)


## About

the purpose of this package is to provide a simple handler for communications between Roblox, your webserver and your [MongoDB](https://www.mongodb.com/docs/) database. This project is still an alpha version of the full idea behind this initiative. In the future will be added a pool for income request from backend to Roblox server and a discord bot concept with several features. Check [Milestones](https://github.com/pollovolante/RobloxWS/milestones) !

## Why should I use it

If you need for whatever reason need to manage your data or communicate from the outside of your Roblox game , then you should use this package. It is the best compromise between a Realtime communication ( which isn't possible on Roblox because of security ) and an optimized solution to manage and beckup your data.

## Requirements

- **NodeJS** (tested on version v18.7.0)
- **npm** (tested on version v8.15.0)
- **typescript** (tested on Version 4.7.4)
- **Host**
- **MongoDB**

## Installation
#### Download 
First of all download the **zip** file or **clone** the repo with 
```sh
git clone git@github.com:pollovolante/RobloxWS.git
```
#### Dependencies
Open terminal into the project directory and execute
```sh
npm i
```
#### Configuration
you need to provide some informations in order to make it work. The file you need to edit is **`.env`** where you can change options
| Key   |      Value      | Example |
|----------|:-------------:|:-------------:|
| **MONGODB_LINK** | provide the URL of your mongoDB database(with user and password if you have one ) | mongodb://user:password@127.0.0.1:27017/ |
| **WEBSERVER_PORT** | port where express should listen for HTTP request ( watch [this](https://devforum.roblox.com/t/port-restrictions-for-httpservice/1500073) before  ) | 8080 |
| **RETRY_DB** | how much time should mongoose service wait before a retry connection | 3000 |
| **ROBLOX_PLACEID** | place id of the experience | 1234567890 |
#### Build
Open **terminal** into the project directory and **execute**
```sh
npm run build
```
#### Roblox configuation
Create a **ServerScript** into your **ServerScriptService** in studio and put into it a **ModuleScript** . Into `src/ServerScriptService/CoreServer`, copy `init.server.lua` content and paste it into the ServerScript and the DataBase.lua into the ModuleScript. `Is it recommended to import the CoreServer folder into Roblox Studio for an automatic implementation`. Finally change the [IP address](https://github.com/pollovolante/RobloxWS/blob/main/src/ServerScriptService/CoreServer/DataBase.lua#L8) into the Module with your own web server URL.


# Execute
It is **recommended** to use [pm2](https://pm2.keymetrics.io/) or similar programs to keep a clean and organized environment.
To execute **backend**
```sh
node build/server/main.js
```

# Usage
coming soon ...
# Communication channels
coming soon ...

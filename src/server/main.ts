import * as dotenv from 'dotenv'
dotenv.config()

import {ServiceHandler} from "./services/ServiceHandler"
import {DatabaseService} from "./services/database/DatabaseService"
import {ExpressWebServerService} from "./services/WebServer/WebServer"

const handler = new ServiceHandler()
const WebServerService = new ExpressWebServerService()
handler.setMany([
  {
    key:'ExpressWebServer',
    service:WebServerService
  },
  {
    key:'DataStore',
    service:new DatabaseService(process.env.MONGODB_LINK!)
  }
])
handler.initALL()



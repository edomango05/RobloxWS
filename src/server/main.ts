import * as dotenv from 'dotenv'
dotenv.config()

import {ServiceHandler} from "./services/ServiceHandler"
import {ExpressWebServerService} from "./services/WebServer/WebServer"

const handler = new ServiceHandler()
const WebServerService = new ExpressWebServerService()
handler.setMany([
  {
    key:'ExpressWebServer',
    service:WebServerService
  },
])
handler.initALL()



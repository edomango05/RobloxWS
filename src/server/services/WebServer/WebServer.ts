import { Service } from '../ServiceHandler'
import { json } from 'body-parser'
import express,{Express} from 'express'
import { promisify } from "util";
import glob from "glob";
import { createServer , Server} from "http";

export class ExpressWebServerService extends Service {
  app: Express;
  http:Server;
  constructor() {
    super('ExpressWebServer')
    this.app = express()
    this.http = createServer(this.app)
  }
  async init() {
    try {
      const globPromise = promisify(glob);
      const port = 3001
      const routeFiles: string[] = await globPromise(
        `${__dirname}/routes/**//*{.ts,.js}`
      );
      this.app.use(json())
      routeFiles.forEach(async (value: string) => {
        const file = await import(value);
        this.app.use(file.default)
      });
      this.app.get('/', (req, res) => {
        return res.send('Online');
      });
      this.http.listen(port, '0.0.0.0', () => {
        console.log(`server listening on port ${port}`)
        this.online = true
        this.emit('online')
      })
      return true
    } catch (error) {
      this.emit('crash')
      console.error(error)
      return
    }
  }
  async stop() {
    return true
  }
}

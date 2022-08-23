import { Collection } from "@discordjs/collection";
import EventEmitter from "events";

export abstract class Service extends EventEmitter{
  readonly name: string;
  private retryAfter: number;
  private reboots: number;
  protected online: boolean;
  constructor(name:string, retryAfter?:number){
    super({captureRejections:true})
    this.online = false
    this.name = name
    this.retryAfter = retryAfter || 5000
    this.reboots = 0

    this.on('crash',()=>{
        this.online = false
        setTimeout(()=>this.restart(),this.retryAfter)
    })
    
  }
  abstract init(...args : any[]): Promise<boolean|undefined>;
  abstract stop(): Promise<boolean>;
  async restart(){
    this.reboots ++
    console.error(`Restarting ${this.name} at point ${this.reboots}`)
    const stop_task = await this.stop().catch(console.error)
    if (!stop_task) return;
    return await this.init().catch(console.error)
  };
  get_reboots(){
    return this.reboots
  }
  is_online(){
    return this.online
  }
}
export class ServiceHandler extends Collection<string, Service> {
  setMany(serviceList:{key:string, service:Service}[]){
    serviceList.forEach(service=>this.set(service.key, service.service))
  }
  restartAll(){
    this.forEach(service=>service.restart())
  }
  stopAll(){
    this.forEach(service=>service.stop())
  }
  initALL(){
    this.forEach(service=>{
      if (service.is_online()) return;
      service.init()
    })
  }
}


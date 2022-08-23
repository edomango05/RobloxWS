import {Service} from '../ServiceHandler'
import {connect,connection} from 'mongoose'

export class DatabaseService extends Service{
  constructor(readonly uri:string){
    super('DataStore')
  }
  async init(){
    try {
      await connect(this.uri,{
        useNewUrlParser : true,
        dbName:'test',
        keepAlive: true,
        keepAliveInitialDelay: 300000
      })
      connection.on('error',error=>{
        this.emit('crash')
        console.error(error)
      })
      console.log('Connessione avvenuta con successo')
      this.online = true
      return true
    } catch (error) {
      this.emit('crash')
      return  
    }
  }
  async stop(){
    return true
  }
}

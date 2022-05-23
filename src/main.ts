import { NestFactory } from '@nestjs/core';
// import { env } from 'process';
import { AppModule } from './app.module';
import {MongoClient} from 'mongodb'

import 'dotenv/config'

interface IApi{
  hostname:string
  port:number
}

interface IDb{
  server:string
  port:number
  login:string
  password:string
  databaseName:string
  collectionName:string
}

interface IConfig{
  db:IDb
  api:IApi
}

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(config.api.port,config.api.hostname);

  console.log("connected to",`mongodb://${config.db.server}:${config.db.port}/`)
  console.log("api exposed at",`${config.api.hostname}:${config.api.port}`)
}

//console.log(process.env.TESTE)//

export const config:IConfig = require("../config.json")

const mClient = new MongoClient(`mongodb://${config.db.login}:${config.db.password}@${config.db.server}:${config.db.port}/`)

mClient.connect()

const db = mClient.db(config.db.databaseName)

export const highscore = db.collection(config.db.collectionName)

bootstrap();

import { NestFactory } from '@nestjs/core';
// import { env } from 'process';
import { AppModule } from './app.module';
import {MongoClient} from 'mongodb'

import 'dotenv/config'
import { NestApplicationOptions } from '@nestjs/common';

import * as fs from "fs"

interface IApi{
  hostname:string
  port:number
  certPath:string
  privateKeyPath:string
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
  const options:NestApplicationOptions = {
    httpsOptions:{
      key: fs.readFileSync(config.api.privateKeyPath),
      cert: fs.readFileSync(config.api.certPath)
    }
  }
  const app = await NestFactory.create(AppModule,options);
  app.enableCors()
  
  await app.listen(config.api.port,config.api.hostname);

  console.log("connected to",`mongodb://${config.db.server}:${config.db.port}/`)

  app.getUrl().then((res)=>{
    console.log("api exposed at",`${res}`)
  })
}

export const config:IConfig = require("../config.json")

const connectionString = `mongodb://${config.db.login}:${config.db.password}@${config.db.server}:${config.db.port}`
const mClient = new MongoClient(connectionString)

mClient.connect((err,res)=>{
  if(err)
    console.log("Cant connect to MongoDB",err)
  else{
    console.log("Connected to MongoDB.\n")
    bootstrap();
  }
})

const db = mClient.db(config.db.databaseName)

export let highscore = db.collection(config.db.collectionName)

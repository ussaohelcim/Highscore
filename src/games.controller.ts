import { Controller, Get, Req, Post, Param, Body, Res, HttpStatus } from '@nestjs/common';
import {Request,Response} from "express";

// import {getTop10fromDB,updatePlayerScore, checkIfScoreItsBetterThanBefore, playerIsAlreadyOnDB, createNewPlayer, getPlayer, getAllFromDB, getAllBetween} from "./Database"

import * as DB from "./Database"

export interface PlayerData{
	name:string
	score:number
}

@Controller('games')
export class GamesController{

	@Get()
	home(){
		return "God bless (you)."
	}

	@Get('top')
	async getTop10(@Res() res:Response)
	{
		const r = await DB.getTop10fromDB()
		res.status(HttpStatus.OK)
		res.json(r)
	}

	@Get('ping')
	ping(){
		return "pong"
	}

	@Get('get/all')
	async getAll()
	{
		return DB.getAllFromDB()
	}

	@Get('get/:start/:end')
	async getBetween(@Param() params)
	{
		let start = Number(params.start)
		let end = Number(params.end)

		if(isNaN(start) || isNaN(end) || start > end)
		{
			end = start + 1
		}

		console.log(start,end)
		const r = await DB.getAllBetween(start,end)
		return r
	}

	@Get('get/:playername')
	getPlayerPosition(@Param() params)
	{
		let player = DB.getPlayer(params.playername)
		if(player) return player
		return "player not found"
	}

	@Post('/add')
	async AddScore(@Body() body:PlayerData,@Res() res:Response)
	{
		if (!this.checkRequest(body)) {
			res.status(HttpStatus.BAD_REQUEST)
			res.send('Wrong request {name:"name",score:123}')
			return "wrong request"
		}

		console.log("body",body)

		let playerData:PlayerData = {
			score:Number(body.score),
			name:body.name
		}

		const foundPlayer = await DB.playerIsAlreadyOnDB(playerData.name)

		console.log("creating a new player?",!foundPlayer)

		if(foundPlayer)
		{
			const newScore =  await DB.checkIfScoreItsBetterThanBefore(playerData)

			if(newScore)
			{
				await DB.updatePlayerScore(playerData)
	
				res.status(HttpStatus.ACCEPTED)
				res.send(`NICE!, score added`)
			}
			else {
				res.status(HttpStatus.FORBIDDEN)
				res.send('git gud')
				return "git gud"
			}
		}
		else{
			DB.createNewPlayer(playerData)
			res.status(HttpStatus.ACCEPTED)
			res.send(`player createad and score added`)
			return `player createad and score added`
		}

	}

	checkRequest(body:PlayerData):boolean
	{
		if(!body.name)
		{
			return false
		}
		else if(!body.score)
		{
			return false
		}

		return !false
	}

}


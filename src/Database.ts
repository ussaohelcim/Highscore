import {highscore} from "./main"
import { PlayerData } from "./games.controller"


export async function playerIsAlreadyOnDB(playerName:string)
{
	let gamesCount = await highscore.countDocuments({name:playerName})
	
	return gamesCount > 0
}

export async function countDocuments() {
	return await highscore.countDocuments().then((res)=>{
		return res
	})
}

export async function updatePlayerScore(data:PlayerData) {
	const playerFound = await playerIsAlreadyOnDB(data.name)

	console.log("found player:",playerFound)

	if(playerFound){
		const updateDoc = {$set:{
			score: data.score
		}}
		console.log(data)
	
		await highscore.updateOne({name:data.name},updateDoc,(err,res)=>{
			
			if (err) throw err;
			console.log(res)
		})
	}
	else{
		createNewPlayer(data)
	}

}
export async function createNewPlayer(data:PlayerData) {
	console.log("creating a new player on database")
	await highscore.insertOne(data)
}

export async function checkIfScoreItsBetterThanBefore(newData:PlayerData):Promise<boolean>{
	let oldData = await highscore.findOne({name:newData.name})

	return newData.score > oldData.score
}

export async function getAllFromDB()
{
	let docs = await highscore.find({}).sort({score:-1}).toArray()
	let r = []
	for (let i = 0; i < docs.length; i++) {
		const element = docs[i];
		r.push({
			position:i+1,
			name:element.name,
			score:element.score
		})
	}
	return r
	
}

export async function getTop10fromDB(){
	let docs = await highscore.find({}).limit(10).sort({score:-1})
	const list = await docs.toArray()

	let r = []

	for (let i = 0; i < list.length; i++) {
		r.push({
			position:i+1,
			name:list[i].name,
			score:list[i].score
		})
	}

	return r
}
export async function getAllBetween(startPosition:number,endPosition:number) {
	let docs = await highscore.find({}).sort({score:-1}).toArray()
	let all = []
	for (let i = 0; i < docs.length; i++) {
		const element = docs[i];

		all.push({
			position :i+1,
			name: element.name,
			score: element.score
		})
	}
	let between = all.filter((e)=>{
		return e.position >= startPosition && e.position <= endPosition
	})

	return between

}

export async function getPlayer(playerName:string) {
	let docs = await highscore.find({}).sort({score:-1}).toArray()

	let position = 0
	for (let i = 0; i < docs.length; i++) {
		const element = docs[i];
		position++
		if(playerName === element.name){
			return {
				position: position,
				name: playerName,
				score: element.score
			}
		}
		
	}
	return {
		position: 0,
		name: playerName,
		score: 0
	}
	
}
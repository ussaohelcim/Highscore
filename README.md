# Highscore

Highscore it's a shit leaderboard api for your games, that just works (sometimes).  
This api its using `Nest.js`,`Node.js` and `MongoDB`.

# SDKs

- Javascript
	- [Highscore.js](https://github.com/ussaohelcim/Highscore.js)

# How to use

- setup your mongodb database, with authorization enabled.
- `git clone https://github.com/ussaohelcim/Highscore.git`  
- `npm install`  
- setup the `config.json` file  
- `npm run start`  
- Make requests to the endpoints  

## Endpoints

- `api/ping`
	- method: GET
	- returns `pong`
- `api/top`
	- method: GET
	- returns a json string with the top 10 best players
	- Example
		- `server/api/get/all`
		- `[{position:1,name:"AAA",score:123456789},...,{position:10,name:"ZZZ",score:9}]`
- `api/get/all`
	- method: GET
	- returns a json string with all the players. Already sorted. 
	- Example
		- `server/api/get/all`
		- `[{position:1,name:"AAA",score:123456789},...,{position:50,name:"ZZZ",score:9}]`
- `api/get/:start/:end`
	- method: GET
	- returns a json string with all players between start and end(inclusive)
	- Example
		- `server/api/get/0/10`
		- `[{position:1,name:"AAA",score:123456789},...,{position:10,name:"ZZZ",score:9}]`
- `api/get/:playername`
	- method: GET
	- returns a json string with the player highscore
	- Example:
		- `server/api/get/AAA`
		- `{position:1,name:"AAA",score:123456789}`
- `api/add`
	- method: POST
	- body:
		```json
		"name" : "playerName",
		"score" : 100
		```
	- try to add a new score
	- Example:
		```powershell
		Invoke-WebRequest -Uri "server/api/add" -Method Post -Body @{name="AAA";score=200;}
		```
	- responses
		- 400 : bad request
			- the body its probably wrong
		- accepted
			- a new score waas added to the database
		- accepted
			- a new player was added to the database
		- 403 : forbidden
			- this player already have a better score than this

# TODO

- Use numbers instead of string to search for players
- Replace config.json with .env
- Add security  
- Add unit tests
- Add docker stuff
- C# and Python SDKs 

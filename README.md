# Highscore

Highscore it's a shit leaderboard api for your games, that just works (sometimes).  
This api its using `Nest.js`,`Node.js` and `MongoDB`.

# SDKs

- Javascript
	- [Highscore.js](https://github.com/ussaohelcim/Highscore.js)

# How to use

`git clone`  
`npm install`  
config the config file  
`npm run start`  
Make requests to the endpoints  

You can get more help [here](/docs/docs.md).

## Endpoints

- `/ping`
	- method: GET
	- returns `pong`
- `/top`
	- method: GET
	- returns a json string with the top 10 best players
- `get/all`
	- method: GET
	- returns a json string with all the players. Already sorted. 
- `get/:start/:end`
	- method: GET
	- returns a json string with all players between start and end(inclusive)
	- Example
		- `server/games/get/0/10`
		- `[{position:1,name:"AAA",score:123456789},...,{position:10,name:"ZZZ",score:9}]`
- `get/:playername`
	- method: GET
	- returns a json string with the player highscore
	- Example:
		- `server/games/get/AAA`
		- `{position:1,name:"AAA",score:123456789}`
- `/add`
	- method: POST
	- body:
		```json
		"name" : "playerName",
		"score" : 100
		```
	- try to add a new score
	- Example:
		```powershell
		Invoke-WebRequest -Uri "" -Method Post -Body @{name="AAA";score=200;}
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
- Add HTTPS  
- Add unit tests
- Add docker stuff
- C# SDKs 

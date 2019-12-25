var csvjson = require('csvjson');
var fileStream = require('fs');
var option = {
				delimiter: ','
			 };

var file = fileStream.readFileSync('./matches.csv','utf8');
var matchCsvFile = csvjson.toObject(file,option);
let matchesPerSeason = {};
let matchesWonPerTeamPerSeason = {}
let yearlyId = {};
console.log("============================# matchesPerSeason #===============================");

for(let id in matchCsvFile){
	if(matchesPerSeason[matchCsvFile[id].season]){//cheking whether season exist in matchesPerSeason Object
		matchesPerSeason[matchCsvFile[id].season]++;
	}
	else{
		matchesPerSeason[matchCsvFile[id].season] = 1;
		matchesWonPerTeamPerSeason[matchCsvFile[id].season] = [];//creating an empty array to store each and every team's winning count per season
		}
}
console.log(matchesPerSeason);//number of matches played per year of all the years in IPL.

console.log("===============================# end ques1 #===================================");
let uniqueSeason = [];
//let matchesWonPerTeamPerSeason = {};

for(let id in matchCsvFile){

	if(uniqueSeason.indexOf(matchCsvFile[id].season) === -1){//cheking whether season exist in matchesPerSeason Object
		
		uniqueSeason.push(matchCsvFile[id].season);
		matchesWonPerTeamPerSeason[matchCsvFile[id].season] = [];//creating an empty array to store each and every team's winning count per season
	}
}	

let teamsCountPerSeason = {};//all teams individual winning count per season

for(let season in matchesWonPerTeamPerSeason){
    
    teamsCountPerSeason = {};
	
	for(let id in matchCsvFile){

		if(matchCsvFile[id].season === season && matchCsvFile[id].winner){

			if(teamsCountPerSeason.hasOwnProperty(matchCsvFile[id].winner)){
			
				teamsCountPerSeason[matchCsvFile[id].winner]++;
			}
			else {
				teamsCountPerSeason[matchCsvFile[id].winner] = 1;
			}
		}
	}
	matchesWonPerTeamPerSeason[season].push(teamsCountPerSeason);
}
console.log(matchesWonPerTeamPerSeason);

console.log("===============================# end ques2 #===================================");

var fs=require('fs');
var deliveries_file=fs.readFileSync('./deliveries.csv','utf8').split('\n');

let extraScorePerTeam = {};
let start_id = 0;//matches start_id of particular season
let end_id = 0;//matches end_id of particular season
let season = '2016';
	for(let id in matchCsvFile){

		if(matchCsvFile[id].season === season){
			end_id = matchCsvFile[id].id;
			if(start_id === 0)
				start_id = matchCsvFile[id].id;
		}
	
}
let deliveriesId_range=0;
let extra_score=0;
let team='';
for(let id=1;id<deliveries_file.length;id++){
		deliveriesId_range =  parseInt(deliveries_file[id].split(',')[0]);
		extra_score = parseInt(deliveries_file[id].split(',')[16]);
		team = deliveries_file[id].split(',')[3];
		if(deliveriesId_range >= start_id && deliveriesId_range <= end_id){
				if(extraScorePerTeam.hasOwnProperty(team)){
					extraScorePerTeam[team]+= extra_score;
				}
				else{
					extraScorePerTeam[team]=extra_score;
				}
		}
		}
console.log(extraScorePerTeam);		


console.log("===============================# end ques3 #===================================");
start_id = 0;//matches start_id of particular season
end_id = 0;//matches end_id of particular season
season = '2015';

	for(let id in matchCsvFile){

		if(matchCsvFile[id].season === season){
			end_id = matchCsvFile[id].id;
			if(start_id === 0)
				start_id = matchCsvFile[id].id;
		}
	
}

let bowlerEconomy = {};
deliveriesId_range = 0;
let total_runs = 0;
let no_balls = 0;
let wide_balls = 0;
let bowler = '';
let bowlerObj = {};

for(let id=1;id<deliveries_file.length;id++){
		deliveriesId_range =  parseInt(deliveries_file[id].split(',')[0]);
		total_runs = parseInt(deliveries_file[id].split(',')[17]);
		no_balls = parseInt(deliveries_file[id].split(',')[10]);
		wide_balls = parseInt(deliveries_file[id].split(',')[13]);
		bowler = deliveries_file[id].split(',')[8];

		if(deliveriesId_range >= start_id && deliveriesId_range <= end_id){
				if(bowlerEconomy.hasOwnProperty(bowler)){
					bowlerObj.runs+= total_runs;
					if(no_balls === 0 && wide_balls === 0)
						bowlerObj.balls++;
				}
					else{
						bowlerObj = {};
						bowlerEconomy[bowler] = bowlerObj;
						bowlerObj.runs = total_runs;
						if(no_balls === 0 && wide_balls === 0){
							bowlerObj.balls = 1;
						}else{
							bowlerObj.balls = 0;
						}
					}
				
		}
}	
let topEconomyBowler = [];
for(let bowler in bowlerEconomy){
	topEconomyBowler.push([bowler,(bowlerEconomy[bowler].runs*6)/bowlerEconomy[bowler].balls]);
}

console.log(topEconomyBowler.sort((a,b)=>a[1]-b[1]).slice(0,10));


console.log("===============================# end ques4 #===================================");
const request = require('request');
//const fs = require('fs');
const token = require('./secrets.js');
const repoName = process.argv[2];
const repoOwner = process.argv[3];


let getRepoContributors = function(owner, name, callback) {
  
  let options = {
    url: 'https://api.github.com/repos/' + owner + '/' + name + '/contributors',
    headers: { 
      'User-Agent': 'request',
      'Authorization': `token ${token.GITHUB_TOKEN}`,
    }
  };
    
  request(options, function(err, response, body) { 
    
    let obj = JSON.parse(body);
    callback(obj);
  });
  

};

getRepoContributors(repoOwner, repoName, function(obj) {
 
  for (let i = 0; i < obj.length; i++) {
    console.log(obj[i]['avatar_url']);  
  }
});




// location of avatar info in JSON API for github
// imgLocation = obj.owner.avatar_url

const request = require('request');
const fs = require('fs');
const repoName = process.argv[2];
const ownerName = process.argv[3];

let createURL = 'https://github.com/' + ownerName + '/' + repoName;
console.log(createURL);


request(createURL)
  .on('error', function(err) {
    throw err;
  })
  .on('response', function(response) {
    console.log('Response satus code: ', response.statusCode);
    console.log('Response message: ', response.statusMessage);
    console.log('Response header: ', response.headers['content-type']);    
  })
  .on('end', function() {
    console.log('Response stream complete.');
  })
  .pipe(fs.createWriteStream('./avatars/image.jpg'));  




// location of avatar info in JSON API for github
// imgLocation = JSON.parse(obj.owner.avatar_url)


// github token: 4e3d6b62666a38428f220f803766a5b80b44533e.pipe(fs.createWriteStream('./future.jpg'));
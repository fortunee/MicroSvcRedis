const app = require('express')();
const responseTime = require('response-time');
const axios = require('axios');
const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', function (err) {
   console.log('Error ' + err);
});

app.set('port', (process.env.PORT || 7676));

app.use(responseTime());

function getUserRepositories(user) {
   const githubEndpoint = 'https://api.github.com/users/'+ user +'/repos' + '?per_page=100';
   return axios.get(githubEndpoint);
}

function computeTotalStars(repos) {
    return repos.data.reduce(function(prev, curr) {
        return prev + curr.stargazers_count;
    }, 0);
}

app.get('/api/:username', function (req, res) {
   const username = req.params.username;
   redisClient.get(username, function(error, result) {
      if (result) {
        res.send({ username, totalStars: result, source: 'redis cache' });
      } else {
          getUserRepositories(username)
              .then(computeTotalStars)
              .then(function (totalStars) {
                  redisClient.setex(username, 60, totalStars);
                  res.send({ username, totalStars, source: "GitHub API" });
              }).catch(function(err) {
                 if (err.status === 404) {
                     res.send('The Github username is not available. Try another one');
                 } else {
                     res.send(err);
                 }
              })
      }
   });
});

app.listen(app.get('port'), function () {
    console.log('Server running on port: ', app.get('port'));
});

















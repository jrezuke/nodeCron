var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var path = require('path');
var CronJob = require('cron').CronJob;
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    //res.send('hi');
    res.sendFile( path.join(__dirname, 'views/index.html'));
});

app.get('/cache', function(req, res){
    let value = myCache.get( "key1" );
    console.log("the value is ", value.data);
    res.send("getting cache" + value.data);
})

app.listen(3500, function(){
    debug(`listening on port ${chalk.green('3500')}`);
    let counter = 0;
    new CronJob('*/10 * * * * *', function() {
        counter++;
        myCache.set("key1", {"data": counter});
        let value = myCache.get( "key1" );
        console.log('You will see this message every 10 seconds : data', value);
      }, null, true, 'America/Los_Angeles');
});


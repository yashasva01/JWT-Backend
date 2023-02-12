const express = require('express');
const router = require('./src/routes/router');
const app = express();
const redis = require('redis');

const port = 9000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});

global.redisClient = redis.createClient();
redisClient
    .on('error', (err) => {
        console.log('Something went wrong ' + err);
    })
    .connect().then(() => {
        console.log('Redis client connected');
    });

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


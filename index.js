const express = require('express');
const router = require('./src/routes/router');
const app = express();

const port = 9000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


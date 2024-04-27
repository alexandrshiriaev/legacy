const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const port = 3000;

const app = express();
const {parseWorker} = require('./src/middlewares/getWorkerByCookie')

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(parseWorker);
app.set('view engine', 'hbs');

const {getLogin} = require("./src/controllers/mainController");
const {postLogin} = require("./src/controllers/tokenController");
const {pool} = require("./src/db/db");
const {getWorkers, postWorkers} = require("./src/controllers/workersController");
const {getLogout, getIndex} = require("./src/controllers/mainController");
const {getTrips, getWorkerTrips, postTrips, getTrip} = require("./src/controllers/tripsController");

app.get('/', getIndex);
app.post('/login', postLogin);
app.get('/login', getLogin);

app.get('/workers', getWorkers);
app.get('/workers/:workerId', getWorkerTrips);
app.post('/workers', postWorkers);

app.get('/logout', getLogout);
app.get('/trips', getTrips);
app.get('/trips/:tripId', getTrip);
app.post('/trips', postTrips);

module.exports = {app};

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

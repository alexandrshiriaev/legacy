const {pool} = require("../db/db");

async function createNewTrip(datestart, dateend, workerId) {
    const client = await pool.connect();
    const queryText = 'INSERT INTO trips (datestart, dateend, workerid) VALUES ($1, $2, $3)';
    await client.query(queryText, [datestart, dateend, workerId]);
    client.release();
}

async function getAllTrips(workerId) {
    const client = await pool.connect();
    const queryText = 'SELECT * FROM trips WHERE workerId=$1';
    const resp = await client.query(queryText, [workerId]);
    client.release();
    return resp.rows
}

async function getTripById(tripId) {
    const client = await pool.connect();
    const queryText = 'SELECT * FROM trips WHERE (id=$1)';
    const resp = await client.query(queryText, [tripId]);
    client.release();
    return resp.rows[0]
}

module.exports = {createNewTrip, getAllTrips, getTripById}
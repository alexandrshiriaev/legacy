const {pool} = require("../db/db");

const { v4: uuidv4 } = require('uuid');

async function getWorkerByToken(token) {
    const client = await pool.connect();
    const queryText = 'SELECT * FROM workers WHERE token = $1';
    const result = await client.query(queryText, [token]);
    client.release();

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

async function createTokenForWorker(workerId) {
    const client = await pool.connect();
    const generatedToken = uuidv4();
    const queryText = "UPDATE workers SET token=$1 WHERE id=$2";
    const result = await client.query(queryText, [generatedToken, workerId]);
    client.release();
    return generatedToken;
}

module.exports = {getWorkerByToken, createTokenForWorker}
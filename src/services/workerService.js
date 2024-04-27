const {pool} = require("../db/db");

async function findWorkerByUsername(username) {
    const client = await pool.connect();
    const queryText = 'SELECT id, name, login, role, password, token FROM workers WHERE login = $1';
    const result = await client.query(queryText, [username]);
    client.release();
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}

async function findAllWorkers() {
    const client = await pool.connect();
    const queryText = 'SELECT * FROM workers';
    const result = await client.query(queryText);
    client.release();
    return result.rows;
}

async function createNewWorker(name, login, password) {
    const client = await pool.connect();
    const queryText = 'INSERT INTO workers (login, name, password, role) VALUES ($1, $2, $3, $4)';
    await client.query(queryText, [login, name, password, false]);
    client.release();
}

async function getWorkerById(workerId) {
    const client = await pool.connect();
    const queryText = 'SELECT * FROM workers WHERE id = $1';
    const result = await client.query(queryText, [
        workerId
    ]);
    client.release();
    return result.rows[0];
}

module.exports = {findWorkerByUsername, getAllWorkers: findAllWorkers, createNewWorker, getWorkerById}
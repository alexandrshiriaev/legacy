const {Pool} = require("pg");

const pool = new Pool({
    user: 'Taras',
    host: 'localhost',
    database: 'ExpenseAccountingSystem',
    password: 'root',
    port: 5432,
});

module.exports = {pool};
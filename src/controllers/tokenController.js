const {findWorkerByUsername} = require("../services/workerService");
const {createTokenForWorker} = require("../services/tokenService");

async function postLogin(req, res) {
    const {username, password} = req.body
    const worker = await findWorkerByUsername(username);
    if (worker === null || password !== worker.password) {
        res.status(401).send("Неправильный логин или пароль");
        return res;
    }

    const generatedToken = await createTokenForWorker(worker.id);
    res.cookie('token', generatedToken)
    res.redirect('/')
}

module.exports = {postLogin}
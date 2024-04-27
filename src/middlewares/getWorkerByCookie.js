const {getWorkerByToken} = require("../services/tokenService");

async function parseWorker(req, res, next) {
    if (req.cookies?.token === undefined || req.cookies.token === "")  {
        req.worker = null;
        return next();
    }
    const userToken = req.cookies.token;
    const worker = await getWorkerByToken(userToken);
    if (worker === null) {
        req.worker = null;
    }
    req.worker = worker;
    next();
}

module.exports = {parseWorker}
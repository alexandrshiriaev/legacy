const {getAllWorkers} = require("../services/workerService");
const {createNewWorker} = require("../services/workerService");

async function getWorkers(req, res) {
    if (!req.worker?.role) res.redirect("/");

    const workers = await getAllWorkers();
    res.render("workers.hbs", {
        workers: workers
    })
}

async function postWorkers(req, res) {
    if (!req.worker?.role) res.redirect("/");

    const {name, login, password} = req.body;
    await createNewWorker(name, login, password);
    res.redirect("/workers");
}

module.exports = {getWorkers, postWorkers}
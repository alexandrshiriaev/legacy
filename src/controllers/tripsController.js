const {createNewTrip} = require("../services/tripsService");
const {getAllTrips} = require("../services/tripsService");
const {getWorkerById} = require("../services/workerService");
const {getTripById} = require("../services/tripsService");

function dateToString(date) {
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

async function getTrips(req, res) {
    if (req.worker === null) return res.redirect("/login");
    if (req.worker.role) return res.redirect("/workers");
    const trips = getAllTrips(req.worker.id);
    res.render("trips.hbs", {
        name: req.worker.name,
        trips: trips.map(trip => {
            return {
                ...trip,
                datestart: dateToString(trip.datestart),
                dateend: dateToString(trip.dateend)
            }
        }),
        role: req.worker.role,
        workerId: req.worker.id
    })
}

async function getTrip(req, res) {
    if (req.params.tripId === "styles.css") return;
    if (req.worker === null) return res.redirect("/login");
    const tripId = parseInt(req.params.tripId);
    if (isNaN(tripId)) return res.redirect("/");
    const trip = await getTripById(tripId);
    if (!req.worker.role && !(req.worker.id === trip.workerId)) return res.redirect("/");
    const worker = await getWorkerById(trip.workerId);
    return res.render("trip.hbs", {
        datestart: dateToString(trip.datestart),
        dateend: dateToString(trip.dateend),
        role: req.worker.role
    })
}

async function getWorkerTrips(req, res) {
    if (req.params.workerId === "styles.css") return;
    if (req.worker === null) return res.redirect("/login");
    const workerId = parseInt(req.params.workerId);
    if (isNaN(workerId)) return res.redirect("/");
    if (!req.worker.role && !(req.worker.id === workerId)) return res.redirect("/");

    const trips = await getAllTrips(workerId);
    res.render("trips.hbs", {
        name: req.worker.name,
        trips: trips.map(trip => {
            return {
                ...trip,
                datestart: dateToString(trip.datestart),
                dateend: dateToString(trip.dateend)
            }
        }),
        role:
        req.worker.role,
        workerId:
        workerId
    })
}

async function postTrips(req, res) {
    if (req.worker === null || !req.worker.role) return res.redirect("/");
    const {dateStart, dateEnd, workerId} = req.body


    await createNewTrip(dateStart, dateEnd, workerId)
    return res.redirect(`/workers/${workerId}`)
}

module.exports = {getTrips, getWorkerTrips, postTrips, getTrip}
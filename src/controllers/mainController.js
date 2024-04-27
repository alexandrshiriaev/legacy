async function getLogin(req, res) {
    if (req.worker !== null) return res.redirect("/")
    return res.render("login.hbs")
}

async function getIndex(req,res) {
    if (req.worker === null) return res.redirect("/login");
    if (req.worker.role) return res.redirect("/workers");
    res.redirect("/trips")
}

async function getLogout(req, res) {
    if (req.worker === null) return res.redirect('/');
    req.worker = null
    res.cookie("token", "")
    res.redirect('/login')
}

module.exports = {getLogin, getLogout, getIndex}


const home = (req, res) => {
    res.render('index.ejs', { title: 'Homewrok Tracker' })
}

module.exports = {
    home,
}
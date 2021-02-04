module.exports.home = (req, res, next) => {
    console.log(process.env.G_CLIENT_ID)

    res.render('common/home');
}
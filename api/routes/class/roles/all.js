module.exports = (req, res) => {
    res.status(200).json(req.class.roles);
}
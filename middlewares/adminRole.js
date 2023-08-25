module.exports = (req, res, next) => {
    if (req.user && req.user.role === 0) {
        return next()
    }
    return res.status(401).json({msg: "Unautaurized admin right"})
}

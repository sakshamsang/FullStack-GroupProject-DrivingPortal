const updateUserValidation = (req, res, next) => {
    const request = req.body;
    const fields = ['firstName', 'lastName', 'licenseNumber', 'age', 'make', 'model', 'year', 'platNumber'];
    const isvalid = fields.every(item => request[item]);
    if (!isvalid) {
        return res.render('g2page', { error: 'Please enter all Values' });
    }
    next()
}
module.exports = updateUserValidation;
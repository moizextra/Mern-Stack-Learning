module.exports = asyncErrorHandle => (req, res, next) => {
    Promise.resolve(asyncErrorHandle(req, res, next)).catch(next());
};

const ErrorHander = require('../utils/errorhandler');

// module.exports = asyncErrorHandle => (req, res, next) => {
//     Promise.resolve(asyncErrorHandle(req, res, next)).catch(next());
// };

const asyncWrapper = asyncErrorHandle => {
    return async (req, res, next) => {
        try {
            await asyncErrorHandle(req, res, next);
        } catch (error) {
            next(new ErrorHander(err.message, 500));
        }
    };
};

module.exports = asyncWrapper;

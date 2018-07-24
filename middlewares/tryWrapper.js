const tryWrapper = asyncMiddleware => {
  return async (req, res, next) => {
    try {
      await asyncMiddleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
module.exports = tryWrapper;

/**
 * Dummy authentication middleware.
 * Assumes a logged-in user with ID 1 for now.
 */
export const authenticate = (req, res, next) => {
    req.user = { id: 1 };
    next();
};

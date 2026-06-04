// authorize.middleware.js
// Middleware to enforce role‑based access control (RBAC)
// Usage: router.use(authorize(['admin'])) – only users with role 'admin' can access the route

const authorize = (allowedRoles = []) => {
  // allowedRoles: array of role strings, e.g. ['admin', 'moderator']
  return (req, res, next) => {
    const user = req.user; // set by protect middleware
    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized – user not authenticated',
      });
    }

    if (allowedRoles.length === 0) {
      // No specific role required – allow any authenticated user
      return next();
    }

    if (allowedRoles.includes(user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      statusCode: 403,
      message: 'Forbidden – insufficient permissions',
    });
  };
};

module.exports = authorize;

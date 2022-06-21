
exports.minimumPermissionLevelRequired = (required_permission_level) => {
   
    return (req, res, next) => {
        return next();

        // SKIPED THE PERMISSION 
        let user_permission_level = parseInt(req.jwt.permissionLevel);
        let userId = req.jwt.userId;
        if (user_permission_level & required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
};

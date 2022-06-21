const InviteController = require('./invite.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const USER = config.permissionLevels.APP_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/invite', [
      ValidationMiddleware.validJWTNeeded,
      PermissionMiddleware.minimumPermissionLevelRequired(USER),
      InviteController.insert
    ]);
    app.get('/invite', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        InviteController.list
    ]);
    app.get('/invite/:inviteId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        InviteController.getById
    ]);
    app.patch('/invite/:inviteId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        InviteController.patchById
    ]);
    app.delete('/invite/:inviteId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        InviteController.removeById
    ]);
};

  
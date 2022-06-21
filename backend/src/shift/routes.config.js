const ShiftController = require('./shift.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const USER = config.permissionLevels.APP_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/shift', [
      ValidationMiddleware.validJWTNeeded,

      PermissionMiddleware.minimumPermissionLevelRequired(USER),
      ShiftController.insert
    ]);
    app.get('/shift', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ShiftController.list
    ]);
    app.get('/shift/:shiftId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ShiftController.getById
    ]);
    app.patch('/shift/:shiftId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ShiftController.patchById
    ]);
    app.delete('/shift/:shiftId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ShiftController.removeById
    ]);
    app.get('/shiftdump', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ShiftController.dumptest
    ]);
};

  
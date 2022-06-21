
const CompanyController = require('./company.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const USER = config.permissionLevels.APP_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/company', [
      ValidationMiddleware.validJWTNeeded, // SKIPPED THE VALIDATION
      PermissionMiddleware.minimumPermissionLevelRequired(USER),
      CompanyController.insert
    ]);
    app.get('/company', [
        ValidationMiddleware.validJWTNeeded, 
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        CompanyController.list
    ]);
    app.get('/company/:companyId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        CompanyController.getById
    ]);
    app.patch('/company/:companyId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        CompanyController.patchById
    ]);
    app.delete('/company/:companyId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CompanyController.removeById
    ]);
};

  
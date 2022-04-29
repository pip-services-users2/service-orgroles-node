"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgRolesController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const client_msgdistribution_node_1 = require("client-msgdistribution-node");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
// import {  } from 'client-accounts-node';
const MessageConnector_1 = require("./MessageConnector");
const OrgRolesCommandSet_1 = require("./OrgRolesCommandSet");
class OrgRolesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_3.DependencyResolver(OrgRolesController._defaultConfig);
        this._messageResolver = new client_msgdistribution_node_1.MessageResolverV1();
        this._logger = new pip_services3_components_nodex_1.CompositeLogger();
        this._demoOrgId = 'demo';
        this._demoOrganizationRuId = 'demo_ru';
    }
    configure(config) {
        this._dependencyResolver.configure(config);
        this._messageResolver.configure(config);
        this._demoOrgId = config.getAsStringWithDefault('options.demo_org_id', this._demoOrgId);
        this._demoOrganizationRuId = config.getAsStringWithDefault('options.demo_organization_ru_id', this._demoOrganizationRuId);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._messageDistributionClient = this._dependencyResolver.getOneOptional('msgdistribution');
        this._rolesClient = this._dependencyResolver.getOneRequired('roles');
        this._organizationsClient = this._dependencyResolver.getOneRequired('organizations');
        this._messageConnector = new MessageConnector_1.MessageConnector(this._logger, this._messageResolver, this._messageDistributionClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new OrgRolesCommandSet_1.OrgRolesCommandSet(this);
        return this._commandSet;
    }
    getOrganizationAdmins(correlationId, orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this._rolesClient.getRolesByFilter(null, pip_services3_commons_nodex_2.FilterParams.fromTuples('roles', [orgId + ':admin']), null);
            if (page != null) {
                let ids = page.data.map(r => r.id);
                return ids;
            }
        });
    }
    getOrganizationUsers(correlationId, orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this._rolesClient.getRolesByFilter(null, pip_services3_commons_nodex_2.FilterParams.fromTuples('roles', [orgId + ':admin', orgId + ':manager', orgId + ':user']), null);
            if (page != null) {
                let ids = page.data.map(r => r.id);
                return ids;
            }
        });
    }
    getOrganizationUserRoles(correlationId, orgId, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this._rolesClient.getRolesByFilter(null, pip_services3_commons_nodex_2.FilterParams.fromTuples('roles', [orgId + ':admin', orgId + ':manager', orgId + ':user']), paging);
            let userRoles = page != null ? page.data : [];
            return userRoles;
        });
    }
    grantOrgRole(correlationId, orgId, userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            role = role || 'user';
            let grantedOrganization;
            if (!(role.includes('admin') || role.includes('manager') || role.includes('user'))) {
                throw new pip_services3_commons_nodex_4.BadRequestException('INVALID_ROLE', 'Invalid organization role: ' + role).withDetails('role', role);
            }
            let roles = [];
            // Grant new role
            let grantRoles = [orgId + ':' + role];
            roles = yield this._rolesClient.grantRoles(correlationId, userId, grantRoles);
            // Revoke other roles
            let revokeRoles = [];
            let adminRole = orgId + ':admin';
            let adminPos = roles.indexOf(adminRole);
            if (role != 'admin' && adminPos >= 0) {
                revokeRoles.push(adminRole);
                roles.splice(adminPos, 1);
            }
            let managerRole = orgId + ':manager';
            let managerPos = roles.indexOf(managerRole);
            if (role != 'manager' && managerPos >= 0) {
                revokeRoles.push(managerRole);
                roles.splice(managerPos, 1);
            }
            let userRole = orgId + ':user';
            let userPos = roles.indexOf(userRole);
            if (role != 'user' && userPos >= 0) {
                revokeRoles.push(userRole);
                roles.splice(userPos, 1);
            }
            if (revokeRoles.length > 0) {
                yield this._rolesClient.revokeRoles(correlationId, userId, revokeRoles);
            }
            // read organization 
            grantedOrganization = yield this._organizationsClient.getOrganizationById(correlationId, orgId);
            // Send grant_access message
            let message = this._messageResolver.resolve('organization_grant_access');
            yield this._messageConnector.sendGrantRoleNotification(correlationId, message, role, userId, grantedOrganization);
            return roles;
        });
    }
    revokeOrgRole(correlationId, orgId, userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role != null && !(role.includes('admin') || role.includes('manager') || role.includes('user'))) {
                throw new pip_services3_commons_nodex_4.BadRequestException('INVALID_ROLE', 'Invalid organization role: ' + role).withDetails('role', role);
            }
            let roles = role ? [orgId + ':' + role] : [orgId + ':admin', orgId + ':manager', orgId + ':user'];
            return yield this._rolesClient.revokeRoles(correlationId, userId, roles);
        });
    }
    grantDemoOrganizationUserRole(correlationId, userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            let demoOrgId = language == 'ru' ? this._demoOrganizationRuId : this._demoOrgId;
            let roles = [demoOrgId + ':user'];
            yield this._rolesClient.grantRoles(correlationId, userId, roles);
            return demoOrgId;
        });
    }
}
exports.OrgRolesController = OrgRolesController;
OrgRolesController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.roles', 'service-roles:client:*:*:1.0', 'dependencies.organizations', 'service-organizations:client:*:*:1.0', 'dependencies.msgdistribution', 'service-msgdistribution:client:*:*:1.0', 'message_templates.organization_grant_access.subject', 'Organization grant access', 'message_templates.organization_grant_access.text', 'You were granted the {{ role }} role on the {{ organization_name }} organization.', 'options.demo_org_id', 'demo', 'options.demo_organization_ru_id', 'demo_ru');
//# sourceMappingURL=OrgRolesController.js.map
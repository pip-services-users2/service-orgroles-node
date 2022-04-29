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
exports.OrgRolesGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/orgroles_v1_grpc_pb');
const messages = require('../../../../src/protos/orgroles_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const OrgRolesGrpcConverterV1_1 = require("./OrgRolesGrpcConverterV1");
class OrgRolesGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.OrgRolesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-orgroles", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getOrganizationAdmins(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let response = new messages.UserIdsReply();
            try {
                let result = yield this._controller.getOrganizationAdmins(correlationId, orgId);
                response.setUserIds(result);
            }
            catch (err) {
                let error = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getOrganizationUsers(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let response = new messages.UserIdsReply();
            try {
                let result = yield this._controller.getOrganizationUsers(correlationId, orgId);
                response.setUserIdsList(result);
            }
            catch (err) {
                let error = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getOrganizationUserRoles(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let paging = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.RolesListReply();
            try {
                let result = yield this._controller.getOrganizationUserRoles(correlationId, orgId, paging);
                let list = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.fromUserRolesList(result);
                response.setUserRolesList(list);
            }
            catch (err) {
                let error = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    grantOrgRole(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let userId = call.request.getUserId();
            let role = call.request.getUserRole();
            let response = new messages.RolesReply();
            try {
                let roles = yield this._controller.grantOrgRole(correlationId, orgId, userId, role);
                if (roles)
                    response.setRolesList(roles);
            }
            catch (err) {
                let error = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    revokeOrgRole(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let userId = call.request.getUserId();
            let role = call.request.getUserRole();
            let response = new messages.RolesReply();
            try {
                let roles = yield this._controller.revokeOrgRole(correlationId, orgId, userId, role);
                if (roles)
                    response.setRolesList(roles);
            }
            catch (err) {
                let error = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    grantDemoOrganizationUserRole(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let userId = call.request.getUserId();
            let language = call.request.getLanguage();
            let response = new messages.OrgIdReply();
            try {
                let orgId = yield this._controller.grantDemoOrganizationUserRole(correlationId, userId, language);
                response.setOrgId(orgId);
            }
            catch (err) {
                let error = OrgRolesGrpcConverterV1_1.OrgRolesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_organization_admins', null, this.getOrganizationAdmins);
        this.registerMethod('get_organization_users', null, this.getOrganizationUsers);
        this.registerMethod('get_organization_user_roles', null, this.getOrganizationUserRoles);
        this.registerMethod('grant_org_role', null, this.grantOrgRole);
        this.registerMethod('revoke_org_role', null, this.revokeOrgRole);
        this.registerMethod('grant_demo_organization_user_role', null, this.grantDemoOrganizationUserRole);
    }
}
exports.OrgRolesGrpcServiceV1 = OrgRolesGrpcServiceV1;
//# sourceMappingURL=OrgRolesGrpcServiceV1.js.map
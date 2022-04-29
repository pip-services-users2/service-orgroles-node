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
exports.OrgRolesCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
class OrgRolesCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands
        this.addCommand(this.makeGetOrganizationUsersCommand());
        this.addCommand(this.makeGetOrganizationAdminsCommand());
        this.addCommand(this.makeGetOrganizationUserRolesCommand());
        this.addCommand(this.makeGrantOrgRoleCommand());
        this.addCommand(this.makeRevokeOrgRoleCommand());
        this.addCommand(this.makeGrantDemoOrganizationUserRoleCommand());
    }
    makeGetOrganizationUsersCommand() {
        return new pip_services3_commons_nodex_2.Command("get_organization_users", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orgId = args.getAsString("org_id");
            return yield this._logic.getOrganizationUsers(correlationId, orgId);
        }));
    }
    makeGetOrganizationAdminsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_organization_admins", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orgId = args.getAsString("org_id");
            return yield this._logic.getOrganizationAdmins(correlationId, orgId);
        }));
    }
    makeGetOrganizationUserRolesCommand() {
        return new pip_services3_commons_nodex_2.Command("get_organization_user_roles", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty('paging', new pip_services3_commons_nodex_6.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orgId = args.getAsString("org_id");
            let paging = pip_services3_commons_nodex_3.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getOrganizationUserRoles(correlationId, orgId, paging);
        }));
    }
    makeGrantOrgRoleCommand() {
        return new pip_services3_commons_nodex_2.Command("grant_org_role", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_5.TypeCode.String)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty('user_role', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orgId = args.getAsString("org_id");
            let userId = args.getAsString("user_id");
            let role = args.getAsString("user_role");
            return yield this._logic.grantOrgRole(correlationId, orgId, userId, role);
        }));
    }
    makeRevokeOrgRoleCommand() {
        return new pip_services3_commons_nodex_2.Command("revoke_org_role", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_5.TypeCode.String)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty('user_role', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orgId = args.getAsString("org_id");
            let userId = args.getAsString("user_id");
            let role = args.getAsString("user_role");
            return yield this._logic.revokeOrgRole(correlationId, orgId, userId, role);
        }));
    }
    makeGrantDemoOrganizationUserRoleCommand() {
        return new pip_services3_commons_nodex_2.Command("grant_demo_organization_user_role", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let userId = args.getAsString("user_id");
            let language = args.getAsString("language");
            return yield this._logic.grantDemoOrganizationUserRole(correlationId, userId, language);
        }));
    }
}
exports.OrgRolesCommandSet = OrgRolesCommandSet;
//# sourceMappingURL=OrgRolesCommandSet.js.map
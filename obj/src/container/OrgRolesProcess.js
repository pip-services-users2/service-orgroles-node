"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgRolesProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const client_accounts_node_1 = require("client-accounts-node");
const client_roles_node_1 = require("client-roles-node");
const client_msgdistribution_node_1 = require("client-msgdistribution-node");
const client_organizations_node_1 = require("client-organizations-node");
const OrgRolesServiceFactory_1 = require("../build/OrgRolesServiceFactory");
class OrgRolesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("org_roles", "Organization roles microservice");
        this._factories.add(new OrgRolesServiceFactory_1.OrgRolesServiceFactory);
        this._factories.add(new client_accounts_node_1.AccountsClientFactory());
        this._factories.add(new client_roles_node_1.RolesClientFactory());
        this._factories.add(new client_msgdistribution_node_1.MessageDistributionClientFactory());
        this._factories.add(new client_organizations_node_1.OrganizationsClientFactory());
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.OrgRolesProcess = OrgRolesProcess;
//# sourceMappingURL=OrgRolesProcess.js.map
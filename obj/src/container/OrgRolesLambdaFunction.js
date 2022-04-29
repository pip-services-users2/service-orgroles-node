"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.OrgRolesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const OrgRolesServiceFactory_1 = require("../build/OrgRolesServiceFactory");
const client_roles_node_1 = require("client-roles-node");
const client_organizations_node_1 = require("client-organizations-node");
const client_msgdistribution_node_1 = require("client-msgdistribution-node");
class OrgRolesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("org_roles", "Organization roles function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-orgroles', 'controller', 'default', '*', '*'));
        this._factories.add(new client_roles_node_1.RolesClientFactory());
        this._factories.add(new client_organizations_node_1.OrganizationsClientFactory());
        this._factories.add(new OrgRolesServiceFactory_1.OrgRolesServiceFactory());
        this._factories.add(new client_msgdistribution_node_1.MessageDistributionClientFactory());
    }
}
exports.OrgRolesLambdaFunction = OrgRolesLambdaFunction;
exports.handler = new OrgRolesLambdaFunction().getHandler();
//# sourceMappingURL=OrgRolesLambdaFunction.js.map
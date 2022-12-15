"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgRolesCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class OrgRolesCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/org_roles');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-orgroles', 'controller', 'default', '*', '1.0'));
    }
}
exports.OrgRolesCommandableHttpServiceV1 = OrgRolesCommandableHttpServiceV1;
//# sourceMappingURL=OrgRolesCommandableHttpServiceV1.js.map
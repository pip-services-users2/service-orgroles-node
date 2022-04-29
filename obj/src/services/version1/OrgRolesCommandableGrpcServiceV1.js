"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgRolesCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class OrgRolesCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/org_roles');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-orgroles', 'controller', 'default', '*', '1.0'));
    }
}
exports.OrgRolesCommandableGrpcServiceV1 = OrgRolesCommandableGrpcServiceV1;
//# sourceMappingURL=OrgRolesCommandableGrpcServiceV1.js.map
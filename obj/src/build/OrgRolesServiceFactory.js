"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgRolesServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const OrgRolesController_1 = require("../logic/OrgRolesController");
const OrgRolesCommandableHttpServiceV1_1 = require("../services/version1/OrgRolesCommandableHttpServiceV1");
const OrgRolesCommandableGrpcServiceV1_1 = require("../services/version1/OrgRolesCommandableGrpcServiceV1");
const OrgRolesGrpcServiceV1_1 = require("../services/version1/OrgRolesGrpcServiceV1");
class OrgRolesServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(OrgRolesServiceFactory.ControllerDescriptor, OrgRolesController_1.OrgRolesController);
        this.registerAsType(OrgRolesServiceFactory.CommandableHttpServiceDescriptor, OrgRolesCommandableHttpServiceV1_1.OrgRolesCommandableHttpServiceV1);
        this.registerAsType(OrgRolesServiceFactory.CommandableGrpcServiceDescriptor, OrgRolesCommandableGrpcServiceV1_1.OrgRolesCommandableGrpcServiceV1);
        this.registerAsType(OrgRolesServiceFactory.GrpcServiceDescriptor, OrgRolesGrpcServiceV1_1.OrgRolesGrpcServiceV1);
    }
}
exports.OrgRolesServiceFactory = OrgRolesServiceFactory;
OrgRolesServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-orgroles", "factory", "default", "default", "1.0");
OrgRolesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-orgroles", "controller", "default", "*", "1.0");
OrgRolesServiceFactory.CommandableHttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-orgroles", "service", "commandable-http", "*", "1.0");
OrgRolesServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-orgroles", "service", "commandable-grpc", "*", "1.0");
OrgRolesServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-orgroles", "service", "grpc", "*", "1.0");
//# sourceMappingURL=OrgRolesServiceFactory.js.map
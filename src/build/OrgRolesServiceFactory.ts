import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { OrgRolesController } from '../logic/OrgRolesController';
import { OrgRolesCommandableHttpServiceV1 } from '../services/version1/OrgRolesCommandableHttpServiceV1';
import { OrgRolesCommandableGrpcServiceV1 } from '../services/version1/OrgRolesCommandableGrpcServiceV1';
import { OrgRolesGrpcServiceV1 } from '../services/version1/OrgRolesGrpcServiceV1';

export class OrgRolesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-orgroles", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("service-orgroles", "controller", "default", "*", "1.0");
	public static CommandableHttpServiceDescriptor = new Descriptor("service-orgroles", "service", "commandable-http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-orgroles", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-orgroles", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(OrgRolesServiceFactory.ControllerDescriptor, OrgRolesController);
		this.registerAsType(OrgRolesServiceFactory.CommandableHttpServiceDescriptor, OrgRolesCommandableHttpServiceV1);
		this.registerAsType(OrgRolesServiceFactory.CommandableGrpcServiceDescriptor, OrgRolesCommandableGrpcServiceV1);
		this.registerAsType(OrgRolesServiceFactory.GrpcServiceDescriptor, OrgRolesGrpcServiceV1);
	}
	
}

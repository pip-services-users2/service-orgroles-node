import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { OrgRolesController } from '../logic/OrgRolesController';
import { OrgRolesHttpServiceV1 } from '../services/version1/OrgRolesHttpServiceV1';
import { OrgRolesCommandableGrpcServiceV1 } from '../services/version1/OrgRolesCommandableGrpcServiceV1';
import { OrgRolesGrpcServiceV1 } from '../services/version1/OrgRolesGrpcServiceV1';

export class OrgRolesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-orgroles", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("service-orgroles", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-orgroles", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-orgroles", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-orgroles", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(OrgRolesServiceFactory.ControllerDescriptor, OrgRolesController);
		this.registerAsType(OrgRolesServiceFactory.HttpServiceDescriptor, OrgRolesHttpServiceV1);
		this.registerAsType(OrgRolesServiceFactory.CommandableGrpcServiceDescriptor, OrgRolesCommandableGrpcServiceV1);
		this.registerAsType(OrgRolesServiceFactory.GrpcServiceDescriptor, OrgRolesGrpcServiceV1);
	}
	
}

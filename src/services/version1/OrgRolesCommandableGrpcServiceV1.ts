import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class OrgRolesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/org_roles');
        this._dependencyResolver.put('controller', new Descriptor('service-orgroles', 'controller', 'default', '*', '1.0'));
    }
}
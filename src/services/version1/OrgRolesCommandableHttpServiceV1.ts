import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class OrgRolesCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/org_roles');
        this._dependencyResolver.put('controller', new Descriptor('service-orgroles', 'controller', 'default', '*', '1.0'));
    }
}
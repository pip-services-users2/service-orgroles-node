import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { AccountsClientFactory } from 'client-accounts-node';
import { RolesClientFactory } from 'client-roles-node';
import { MessageDistributionClientFactory } from 'client-msgdistribution-node';
import { OrganizationsClientFactory } from 'client-organizations-node';

import { OrgRolesServiceFactory } from '../build/OrgRolesServiceFactory';

export class OrgRolesProcess extends ProcessContainer {

    public constructor() {
        super("org_roles", "Organization roles microservice");
        this._factories.add(new OrgRolesServiceFactory);
        this._factories.add(new AccountsClientFactory());
        this._factories.add(new RolesClientFactory());
        this._factories.add(new MessageDistributionClientFactory());
        this._factories.add(new OrganizationsClientFactory());
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}

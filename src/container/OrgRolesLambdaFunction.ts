import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { OrgRolesServiceFactory } from '../build/OrgRolesServiceFactory';
import { RolesClientFactory } from 'client-roles-node';
import { OrganizationsClientFactory } from 'client-organizations-node';
import { MessageDistributionClientFactory } from 'client-msgdistribution-node';

export class OrgRolesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("org_roles", "Organization roles function");
        this._dependencyResolver.put('controller', new Descriptor('service-orgroles', 'controller', 'default', '*', '*'));
        this._factories.add(new RolesClientFactory());
        this._factories.add(new OrganizationsClientFactory());
        this._factories.add(new OrgRolesServiceFactory());
        this._factories.add(new MessageDistributionClientFactory());
    }
}

export const handler = new OrgRolesLambdaFunction().getHandler();
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { BadRequestException } from 'pip-services3-commons-nodex';
import { MessageResolverV1 } from 'client-msgdistribution-node';
import { CompositeLogger } from 'pip-services3-components-nodex';
import { IMessageDistributionClientV1 } from 'client-msgdistribution-node';
import { IRolesClientV1 } from 'client-roles-node';

import { IOrganizationsClientV1 } from 'client-organizations-node';
import { OrganizationV1 } from 'client-organizations-node';

// import {  } from 'client-accounts-node';

import { MessageConnector } from './MessageConnector';
import { IOrgRolesController } from './IOrgRolesController';
import { OrgRolesCommandSet } from './OrgRolesCommandSet';
import { UserRolesV1 } from '../data/version1/UserRolesV1';


export class OrgRolesController implements IConfigurable, IReferenceable, ICommandable, IOrgRolesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.roles', 'service-roles:client:*:*:1.0',
        'dependencies.organizations', 'service-organizations:client:*:*:1.0',
        'dependencies.msgdistribution', 'service-msgdistribution:client:*:*:1.0',
        
        'message_templates.organization_grant_access.subject', 'Organization grant access',
        'message_templates.organization_grant_access.text', 'You were granted the {{ role }} role on the {{ organization_name }} organization.',

        'options.demo_org_id', 'demo',
        'options.demo_organization_ru_id', 'demo_ru'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(OrgRolesController._defaultConfig);
    private _messageResolver: MessageResolverV1 = new MessageResolverV1();
    private _logger: CompositeLogger = new CompositeLogger();
    private _organizationsClient: IOrganizationsClientV1;
    private _messageDistributionClient: IMessageDistributionClientV1;
    private _messageConnector: MessageConnector;
    private _rolesClient: IRolesClientV1;
    private _commandSet: OrgRolesCommandSet;
    private _demoOrgId: string = 'demo';
    private _demoOrganizationRuId: string = 'demo_ru';

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
        this._messageResolver.configure(config);

        this._demoOrgId = config.getAsStringWithDefault('options.demo_org_id', this._demoOrgId);
        this._demoOrganizationRuId = config.getAsStringWithDefault('options.demo_organization_ru_id', this._demoOrganizationRuId);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._messageDistributionClient = this._dependencyResolver.getOneOptional<IMessageDistributionClientV1>('msgdistribution');
        this._rolesClient = this._dependencyResolver.getOneRequired<IRolesClientV1>('roles');
        this._organizationsClient = this._dependencyResolver.getOneRequired<IOrganizationsClientV1>('organizations');

        this._messageConnector = new MessageConnector(
            this._logger,
            this._messageResolver,
            this._messageDistributionClient
        );
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new OrgRolesCommandSet(this);
        return this._commandSet;
    }

    public async getOrganizationAdmins(correlationId: string, orgId: string): Promise<string[]> {
        let page = await this._rolesClient.getRolesByFilter(
            null,
            FilterParams.fromTuples(
                'roles', [orgId + ':admin']
            ),
            null
        );

        if (page != null) {
            let ids = page.data.map(r => r.id);
            return ids;
        } 
    }

    public async getOrganizationUsers(correlationId: string, orgId: string): Promise<string[]> {
        let page = await this._rolesClient.getRolesByFilter(
            null,
            FilterParams.fromTuples(
                'roles', [orgId + ':admin', orgId + ':manager', orgId + ':user']
            ),
            null
        );

        if (page != null) {
            let ids = page.data.map(r => r.id);
            return ids;
        }
    }

    public async getOrganizationUserRoles(correlationId: string, orgId: string, paging: PagingParams): Promise<UserRolesV1[]> {
        let page = await this._rolesClient.getRolesByFilter(
            null,
            FilterParams.fromTuples(
                'roles', [orgId + ':admin', orgId + ':manager', orgId + ':user']
            ),
            paging
        );

        let userRoles = page != null ? page.data : [];
        return userRoles;
    }

    public async grantOrgRole(correlationId: string, orgId: string, userId: string, role: string): Promise<string[]> {
        role = role || 'user';

        let grantedOrganization: OrganizationV1;
        if (!(role.includes('admin') || role.includes('manager') || role.includes('user'))) {
            throw new BadRequestException(
                'INVALID_ROLE',
                'Invalid organization role: ' + role
            ).withDetails('role', role);
        }

        let roles: string[] = [];

        // Grant new role
        let grantRoles = [orgId + ':' + role];
        roles = await this._rolesClient.grantRoles(correlationId, userId, grantRoles);
        
        // Revoke other roles
        let revokeRoles = [];

        let adminRole = orgId + ':admin';
        let adminPos = roles.indexOf(adminRole);
        if (role != 'admin' && adminPos >= 0) {
            revokeRoles.push(adminRole);
            roles.splice(adminPos, 1);
        }

        let managerRole = orgId + ':manager';
        let managerPos = roles.indexOf(managerRole);
        if (role != 'manager' && managerPos >= 0) {
            revokeRoles.push(managerRole);
            roles.splice(managerPos, 1);
        }

        let userRole = orgId + ':user';
        let userPos = roles.indexOf(userRole);
        if (role != 'user' && userPos >= 0) {
            revokeRoles.push(userRole);
            roles.splice(userPos, 1);
        }

        if (revokeRoles.length > 0) {
            await this._rolesClient.revokeRoles(correlationId, userId, revokeRoles);
        }

        // read organization 
        grantedOrganization = await this._organizationsClient.getOrganizationById(
            correlationId, orgId
        );

        // Send grant_access message
        let message = this._messageResolver.resolve('organization_grant_access');
        await this._messageConnector.sendGrantRoleNotification(correlationId, message, role, userId, grantedOrganization);

        return roles;
    }

    public async revokeOrgRole(correlationId: string, orgId: string, userId: string, role: string): Promise<string[]> {
        if (role != null && !(role.includes('admin') || role.includes('manager') || role.includes('user'))) {
            throw new BadRequestException(
                'INVALID_ROLE',
                'Invalid organization role: ' + role
            ).withDetails('role', role);
        }

        let roles = role ? [orgId + ':' + role] : [orgId + ':admin', orgId + ':manager', orgId + ':user'];

        return await this._rolesClient.revokeRoles(correlationId, userId, roles);
    }

    public async grantDemoOrganizationUserRole(correlationId: string, userId: string, language: string): Promise<string> {
        let demoOrgId = language == 'ru' ? this._demoOrganizationRuId : this._demoOrgId;             
        let roles = [demoOrgId + ':user'];

        await this._rolesClient.grantRoles(correlationId, userId, roles);

        return demoOrgId;
    }

}

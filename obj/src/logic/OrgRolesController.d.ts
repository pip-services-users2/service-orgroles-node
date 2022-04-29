import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IOrgRolesController } from './IOrgRolesController';
import { UserRolesV1 } from '../data/version1/UserRolesV1';
export declare class OrgRolesController implements IConfigurable, IReferenceable, ICommandable, IOrgRolesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _messageResolver;
    private _logger;
    private _organizationsClient;
    private _messageDistributionClient;
    private _messageConnector;
    private _rolesClient;
    private _commandSet;
    private _demoOrgId;
    private _demoOrganizationRuId;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getOrganizationAdmins(correlationId: string, orgId: string): Promise<string[]>;
    getOrganizationUsers(correlationId: string, orgId: string): Promise<string[]>;
    getOrganizationUserRoles(correlationId: string, orgId: string, paging: PagingParams): Promise<UserRolesV1[]>;
    grantOrgRole(correlationId: string, orgId: string, userId: string, role: string): Promise<string[]>;
    revokeOrgRole(correlationId: string, orgId: string, userId: string, role: string): Promise<string[]>;
    grantDemoOrganizationUserRole(correlationId: string, userId: string, language: string): Promise<string>;
}

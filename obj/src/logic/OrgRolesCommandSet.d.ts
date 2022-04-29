import { CommandSet } from 'pip-services3-commons-nodex';
import { IOrgRolesController } from './IOrgRolesController';
export declare class OrgRolesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IOrgRolesController);
    private makeGetOrganizationUsersCommand;
    private makeGetOrganizationAdminsCommand;
    private makeGetOrganizationUserRolesCommand;
    private makeGrantOrgRoleCommand;
    private makeRevokeOrgRoleCommand;
    private makeGrantDemoOrganizationUserRoleCommand;
}

import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { IOrgRolesController } from './IOrgRolesController';

export class OrgRolesCommandSet extends CommandSet {
    private _logic: IOrgRolesController;

    constructor(logic: IOrgRolesController) {
        super();

        this._logic = logic;

        // Register commands
        this.addCommand(this.makeGetOrganizationUsersCommand());
        this.addCommand(this.makeGetOrganizationAdminsCommand());
        this.addCommand(this.makeGetOrganizationUserRolesCommand());
        this.addCommand(this.makeGrantOrgRoleCommand());
        this.addCommand(this.makeRevokeOrgRoleCommand());
		this.addCommand(this.makeGrantDemoOrganizationUserRoleCommand());
    }

	private makeGetOrganizationUsersCommand(): ICommand {
		return new Command(
			"get_organization_users",
			new ObjectSchema(true)
                .withRequiredProperty('org_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let orgId = args.getAsString("org_id");
                return await this._logic.getOrganizationUsers(correlationId, orgId);
            }
		);
	}

	private makeGetOrganizationAdminsCommand(): ICommand {
		return new Command(
			"get_organization_admins",
			new ObjectSchema(true)
                .withRequiredProperty('org_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let orgId = args.getAsString("org_id");
                return await this._logic.getOrganizationAdmins(correlationId, orgId);
            }
		);
	}
    
    private makeGetOrganizationUserRolesCommand(): ICommand {
		return new Command(
			"get_organization_user_roles",
			new ObjectSchema(true)
                .withRequiredProperty('org_id', TypeCode.String)
                .withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let orgId = args.getAsString("org_id");
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getOrganizationUserRoles(correlationId, orgId, paging);
            }
		);
	}

    private makeGrantOrgRoleCommand(): ICommand {
		return new Command(
			"grant_org_role",
			new ObjectSchema(true)
                .withRequiredProperty('org_id', TypeCode.String)
                .withRequiredProperty('user_id', TypeCode.String)
                .withOptionalProperty('user_role', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let orgId = args.getAsString("org_id");
                let userId = args.getAsString("user_id");
                let role = args.getAsString("user_role");
                return await this._logic.grantOrgRole(correlationId, orgId, userId, role);
            }
		);
	}

    private makeRevokeOrgRoleCommand(): ICommand {
		return new Command(
			"revoke_org_role",
			new ObjectSchema(true)
                .withRequiredProperty('org_id', TypeCode.String)
                .withRequiredProperty('user_id', TypeCode.String)
                .withOptionalProperty('user_role', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let orgId = args.getAsString("org_id");
                let userId = args.getAsString("user_id");
                let role = args.getAsString("user_role");
                return await this._logic.revokeOrgRole(correlationId, orgId, userId, role);
            }
		);
	}
    
    private makeGrantDemoOrganizationUserRoleCommand(): ICommand {
		return new Command(
			"grant_demo_organization_user_role",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let userId = args.getAsString("user_id");
                let language: string = args.getAsString("language");
                return await this._logic.grantDemoOrganizationUserRole(correlationId, userId, language);
            }
		);
	}

}
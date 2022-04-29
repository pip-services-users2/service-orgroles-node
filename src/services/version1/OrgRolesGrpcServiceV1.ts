const services = require('../../../../src/protos/orgroles_v1_grpc_pb');
const messages = require('../../../../src/protos/orgroles_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IOrgRolesController } from '../../logic/IOrgRolesController';
import { OrgRolesGrpcConverterV1 } from './OrgRolesGrpcConverterV1';

export class OrgRolesGrpcServiceV1 extends GrpcService {
    private _controller: IOrgRolesController;
	
    public constructor() {
        super(services.OrgRolesService);
        this._dependencyResolver.put('controller', new Descriptor("service-orgroles", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IOrgRolesController>('controller');
    }
    
    private async getOrganizationAdmins(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();

        let response = new messages.UserIdsReply();

        try {
            let result = await this._controller.getOrganizationAdmins(
                correlationId,
                orgId,
            );
            response.setUserIds(result);
        } catch (err) {
            let error = OrgRolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getOrganizationUsers(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();

        let response = new messages.UserIdsReply();

        try {
            let result = await this._controller.getOrganizationUsers(correlationId, orgId);
            response.setUserIdsList(result);
        } catch(err) {
            let error = OrgRolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getOrganizationUserRoles(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();
        let paging = OrgRolesGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.RolesListReply();

        try {
            let result = await this._controller.getOrganizationUserRoles(correlationId, orgId, paging);
            let list = OrgRolesGrpcConverterV1.fromUserRolesList(result);
            response.setUserRolesList(list);
        } catch(err) {
            let error = OrgRolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async grantOrgRole(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();
        let userId = call.request.getUserId();
        let role = call.request.getUserRole();

        let response = new messages.RolesReply();

        try {
            let roles = await this._controller.grantOrgRole(correlationId, orgId, userId, role);
            if (roles)
                response.setRolesList(roles);
        } catch(err) {
            let error = OrgRolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async revokeOrgRole(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();
        let userId = call.request.getUserId();
        let role = call.request.getUserRole();

        let response = new messages.RolesReply();

        try {
            let roles = await this._controller.revokeOrgRole(correlationId, orgId, userId, role);
            if (roles)
                response.setRolesList(roles);
        } catch(err) {
            let error = OrgRolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async grantDemoOrganizationUserRole(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let language = call.request.getLanguage();
        
        let response = new messages.OrgIdReply();

        try {
            let orgId = await this._controller.grantDemoOrganizationUserRole(correlationId, userId, language);
            response.setOrgId(orgId);
        } catch(err) {
            let error = OrgRolesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }
        
    public register() {
        this.registerMethod(
            'get_organization_admins', 
            null,
            this.getOrganizationAdmins
        );

        this.registerMethod(
            'get_organization_users', 
            null,
            this.getOrganizationUsers
        );

        this.registerMethod(
            'get_organization_user_roles', 
            null,
            this.getOrganizationUserRoles
        );

        this.registerMethod(
            'grant_org_role', 
            null,
            this.grantOrgRole
        );

        this.registerMethod(
            'revoke_org_role', 
            null,
            this.revokeOrgRole
        );

        this.registerMethod(
            'grant_demo_organization_user_role', 
            null,
            this.grantDemoOrganizationUserRole
        );
    }
}

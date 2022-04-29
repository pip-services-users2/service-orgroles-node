import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class OrgRolesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getOrganizationAdmins;
    private getOrganizationUsers;
    private getOrganizationUserRoles;
    private grantOrgRole;
    private revokeOrgRole;
    private grantDemoOrganizationUserRole;
    register(): void;
}

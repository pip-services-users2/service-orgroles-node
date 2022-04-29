import { PagingParams } from 'pip-services3-commons-nodex';
import { UserRolesV1 } from '../../data/version1/UserRolesV1';
export declare class OrgRolesGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromUserRoles(userRoles: UserRolesV1): any;
    static toUserRoles(obj: any): UserRolesV1;
    static fromUserRolesList(list: UserRolesV1[]): any;
    static toUserRolesList(obj: any): UserRolesV1;
}

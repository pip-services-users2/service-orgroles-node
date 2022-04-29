const messages = require('../../../../src/protos/orgroles_v1_pb');

import { PagingParams } from 'pip-services3-commons-nodex';
import { StringConverter } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { UserRolesV1 } from '../../data/version1/UserRolesV1';

export class OrgRolesGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        OrgRolesGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: OrgRolesGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject == 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        OrgRolesGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromUserRoles(userRoles: UserRolesV1): any {
        if (userRoles == null) return null;

        let obj = new messages.UserRoles();

        obj.setId(userRoles.id);
        obj.setUpdateTime(StringConverter.toString(userRoles.update_time))
        obj.setRolesList(userRoles.roles);

        return obj;
    }

    public static toUserRoles(obj: any): UserRolesV1 {
        if (obj == null) return null;

        let userRoles: UserRolesV1 = {
            id: obj.getId(),
            update_time: DateTimeConverter.toDateTime(obj.getUpdateTime()),
            roles: obj.getRolesList()
        };

        return userRoles;
    }

    public static fromUserRolesList(list: UserRolesV1[]): any {
        if (list == null) return null;

        let result = list.map(OrgRolesGrpcConverterV1.fromUserRoles);

        return result;
    }

    public static toUserRolesList(obj: any): UserRolesV1 {
        if (obj == null) return null;

        let result = obj.map(OrgRolesGrpcConverterV1.toUserRoles);

        return result;
    }

}
const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { OrgRolesController } from '../../../src/logic/OrgRolesController';
import { OrgRolesCommandableGrpcServiceV1 } from '../../../src/services/version1/OrgRolesCommandableGrpcServiceV1';

import { RolesNullClientV1 } from 'client-roles-node';
import { OrganizationsNullClientV1 } from 'client-organizations-node';
import { MessageDistributionNullClientV1 } from 'client-msgdistribution-node';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('OrgRolesCommandableGrpcServiceV1', ()=> {
    let service: OrgRolesCommandableGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let controller = new OrgRolesController();

        service = new OrgRolesCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-roles', 'client', 'null', 'default', '1.0'), new RolesNullClientV1(),
            new Descriptor('service-msgdistribution', 'client', 'null', 'default', '1.0'), new MessageDistributionNullClientV1(),
            new Descriptor('service-organizations', 'client', 'null', 'default', '1.0'), new OrganizationsNullClientV1(),
            new Descriptor('service-orgroles', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-orgroles', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Grant and Revoke Organization Roles', async () => {
        // Grant organization role
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/org_roles.grant_org_role',
                    args_empty: false,
                    args_json: JSON.stringify({
                        org_id: '1',
                        user_id: '123',
                        user_role: 'manager'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let roles = JSON.parse(response.result_json);

        assert.isArray(roles);
        assert.lengthOf(roles, 1);
        assert.equal('1:manager', roles[0]);

        // Get organization roles
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/org_roles.get_organization_user_roles',
                    args_empty: false,
                    args_json: JSON.stringify({
                        org_id: '1'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let useRoles = JSON.parse(response.result_json);

        // assert.isArray(userRoles);
        // assert.lengthOf(userRoles, 4);

        // Revoke organization role
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/org_roles.revoke_org_role',
                    args_empty: false,
                    args_json: JSON.stringify({
                        org_id: '1',
                        user_id: '123',
                        user_role: 'manager'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        roles = JSON.parse(response.result_json);

        assert.isArray(roles);
        assert.lengthOf(roles, 0);

    });
    
    test('Grant Demo Organization User Role', async () => {
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/org_roles.grant_demo_organization_user_role',
                    args_empty: false,
                    args_json: JSON.stringify({
                        user_id: '123'
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let orgId = JSON.parse(response.result_json);

        assert.isString(orgId);
    });

});

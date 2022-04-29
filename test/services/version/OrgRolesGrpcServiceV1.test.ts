const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { OrgRolesController } from '../../../src/logic/OrgRolesController';
import { OrgRolesGrpcServiceV1 } from '../../../src/services/version1/OrgRolesGrpcServiceV1';

import { RolesNullClientV1 } from 'client-roles-node';
import { OrganizationsNullClientV1 } from 'client-organizations-node';
import { MessageDistributionNullClientV1 } from 'client-msgdistribution-node';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

suite('OrgRolesGrpcServiceV1', ()=> {
    let service: OrgRolesGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let controller = new OrgRolesController();

        service = new OrgRolesGrpcServiceV1();
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
            __dirname + "../../../../../src/protos/orgroles_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).orgroles_v1.OrgRoles;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Grant and Revoke Organization Roles', async () => {
        // Grant organization role
        let response = await new Promise<any>((resolve, reject) => {
            client.grant_org_role(
                {
                    org_id: '1',
                    user_id: '123',
                    user_role: 'manager'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let roles = response ? response.roles : null;

        assert.isArray(roles);
        assert.lengthOf(roles, 1);
        assert.equal('1:manager', roles[0]);

        // Get organization roles
        response = await new Promise<any>((resolve, reject) => {
            client.get_organization_user_roles(
                {
                    org_id: '1'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let userRoles = response ? response.user_roles : null;

        // assert.isArray(userRoles);
        // assert.lengthOf(userRoles, 4);

        // Revoke organization role
        response = await new Promise<any>((resolve, reject) => {
            client.revoke_org_role(
                {
                    org_id: '1',
                    user_id: '123',
                    user_role: 'manager'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        roles = response ? response.roles : null;

        assert.isArray(roles);
        assert.lengthOf(roles, 0);
    });
    
    test('Grant Demo Organization User Role', async () => {
        let response = await new Promise<any>((resolve, reject) => {
            client.grant_demo_organization_user_role(
                {
                    user_id: '123'
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let orgId = response ? response.org_id : null;

        assert.isString(orgId);
    });
    
});

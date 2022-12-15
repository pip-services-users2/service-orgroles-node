const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { OrgRolesController } from '../../../src/logic/OrgRolesController';
import { OrgRolesCommandableHttpServiceV1 } from '../../../src/services/version1/OrgRolesCommandableHttpServiceV1';

import { RolesNullClientV1 } from 'client-roles-node';
import { OrganizationsNullClientV1 } from 'client-organizations-node';
import { MessageDistributionNullClientV1 } from 'client-msgdistribution-node';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('OrgRolesCommandableHttpServiceV1', ()=> {
    let service: OrgRolesCommandableHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let controller = new OrgRolesController();

        service = new OrgRolesCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-roles', 'client', 'null', 'default', '1.0'), new RolesNullClientV1(),
            new Descriptor('service-orgroles', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-orgroles', 'service', 'commandable-http', 'default', '1.0'), service,
            new Descriptor('service-msgdistribution', 'client', 'null', 'default', '1.0'), new MessageDistributionNullClientV1(),
            new Descriptor('service-organizations', 'client', 'null', 'default', '1.0'), new OrganizationsNullClientV1()
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('Grant and Revoke Organization Roles', async () => {
        // Grant organization role
        let roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/org_roles/grant_org_role',
                {
                    org_id: '1',
                    user_id: '123',
                    user_role: 'manager'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isArray(roles);
        assert.lengthOf(roles, 1);
        assert.equal('1:manager', roles[0]);

        // Get organization roles
        roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/org_roles/get_organization_user_roles',
                {
                    org_id: '1'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isArray(roles);
        // assert.lengthOf(roles, 4);

        // Revoke organization role
        roles = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/org_roles/revoke_org_role',
                {
                    org_id: '1',
                    user_id: '123',
                    user_role: 'manager'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isArray(roles);
        assert.lengthOf(roles, 0);
    });
    
    test('Grant Demo Organization User Role', async () => {
        let rolesOrgId = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/org_roles/grant_demo_organization_user_role',
                {
                    user_id: '123'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isString(rolesOrgId);
    });
});
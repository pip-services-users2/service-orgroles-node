const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { OrgRolesLambdaFunction } from '../../src/container/OrgRolesLambdaFunction';

suite('OrgRolesLambdaFunction', ()=> {
    let lambda: OrgRolesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'controller.descriptor', 'service-orgroles:controller:default:default:1.0',
            'msgdistribution.descriptor', 'service-msgdistribution:client:null:default:1.0',
            'roles.descriptor', 'service-roles:client:null:default:1.0',
            'organizations.descriptor', 'service-organizations:client:null:default:1.0'
        );

        lambda = new OrgRolesLambdaFunction();
        await lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });

    test('Grant and Revoke Organization Roles', async () => {
        // Grant organization role
        let roles = await lambda.act(
            {
                role: 'roles',
                cmd: 'grant_org_role',
                org_id: '1',
                user_id: '123',
                user_role: 'manager'
            }
        );

        assert.isArray(roles);
        assert.lengthOf(roles, 1);
        assert.equal('1:manager', roles[0]);

        // Get organization roles
        let userRoles = await lambda.act(
            {
                role: 'roles',
                cmd: 'get_organization_user_roles',
                org_id: '1'
            }
        );

        // assert.isArray(userRoles);
        // assert.lengthOf(userRoles, 4);

        // Revoke organization role
        roles = await lambda.act(
            {
                role: 'roles',
                cmd: 'revoke_org_role',
                org_id: '1',
                user_id: '123',
                user_role: 'manager'
            }
        );

        assert.isArray(roles);
        assert.lengthOf(roles, 0);
    });
    
    test('Grant demo organization user role', async () => {
        let rolesOrgId = await lambda.act(
            {
                role: 'roles',
                cmd: 'grant_demo_organization_user_role',
                user_id: '123'
            }
        );

        assert.isString(rolesOrgId);
    });
});
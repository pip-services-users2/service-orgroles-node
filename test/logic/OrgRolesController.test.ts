const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { OrgRolesController } from '../../src/logic/OrgRolesController';

import { RolesNullClientV1 } from 'client-roles-node';
import { OrganizationsNullClientV1 } from 'client-organizations-node';
import { MessageDistributionNullClientV1 } from 'client-msgdistribution-node';

suite('OrgRolesController', ()=> {
    let controller = new OrgRolesController();

    suiteSetup(() => {
        let references: References = References.fromTuples(
            new Descriptor('service-roles', 'client', 'null', 'default', '1.0'), new RolesNullClientV1(),
            new Descriptor('service-organizations', 'client', 'null', 'default', '1.0'), new OrganizationsNullClientV1(),
            new Descriptor('service-msgdistribution', 'client', 'null', 'default', '1.0'), new MessageDistributionNullClientV1(),
            new Descriptor('service-orgroles', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);

        //controller.open(null, done);
    });

    test('Grant and Revoke Organization Roles', async () => {
        // Grant organization role
        let roles = await controller.grantOrgRole(null, '1', '123', 'manager');

        assert.isArray(roles);
        assert.lengthOf(roles, 1);
        assert.equal('1:manager', roles[0]);

        // Get organization roles
        let userRoles = await controller.getOrganizationUserRoles(null, '1', null);

        // assert.isArray(userRoles);
        // assert.lengthOf(userRoles, 4);

        // Get organization users
        let userIds = await controller.getOrganizationUsers(null, '1');

        // assert.isArray(userIds);
        // assert.lengthOf(userIds, 4);

        // Revoke organization role
        roles = await controller.revokeOrgRole(null, '1', '123', 'manager');

        assert.isArray(roles);
        assert.lengthOf(roles, 0);
    });
    
    test('Grant Demo Organization User Role', async () => {

        let demoOrgId = await controller.grantDemoOrganizationUserRole(null, '123', 'ru');
        
        assert.isString(demoOrgId);
    });

});
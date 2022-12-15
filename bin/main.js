let OrgRolesProcess = require('../obj/src/container/OrgRolesProcess').OrgRolesProcess;

try {
    new OrgRolesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageConnector = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const client_msgdistribution_node_1 = require("client-msgdistribution-node");
class MessageConnector {
    constructor(_logger, _messageResolver, _messageDistributionClient) {
        this._logger = _logger;
        this._messageResolver = _messageResolver;
        this._messageDistributionClient = _messageDistributionClient;
        if (_messageDistributionClient == null)
            this._logger.warn(null, 'Email or Message distribution client was not found. Grant organization role notifications are disabled');
    }
    sendGrantRoleNotification(correlationId, message, role, userId, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._messageDistributionClient == null)
                return;
            if (message == null)
                return;
            let parameters = pip_services3_commons_nodex_1.ConfigParams.fromTuples('role', role, 'org_id', organization.id, 'organization_name', organization.name, 'create_time', new Date());
            try {
                yield this._messageDistributionClient.sendMessageToRecipient(correlationId, userId, null, message, parameters, client_msgdistribution_node_1.DeliveryMethodV1.Email);
            }
            catch (err) {
                this._logger.error(correlationId, err, 'Failed to send message');
            }
        });
    }
}
exports.MessageConnector = MessageConnector;
//# sourceMappingURL=MessageConnector.js.map
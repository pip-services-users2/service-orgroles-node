import { ILogger } from 'pip-services3-components-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';

import { MessageV1 } from 'client-msgdistribution-node';
import { DeliveryMethodV1 } from 'client-msgdistribution-node';
import { MessageResolverV1 } from 'client-msgdistribution-node';
import { IMessageDistributionClientV1 } from 'client-msgdistribution-node';
import { OrganizationV1} from 'client-organizations-node'

export class MessageConnector {
    public constructor(
        private _logger: ILogger,
        private _messageResolver: MessageResolverV1,
        private _messageDistributionClient: IMessageDistributionClientV1
    ) {
        if (_messageDistributionClient == null)
            this._logger.warn(null, 'Email or Message distribution client was not found. Grant organization role notifications are disabled');
    }

    public async sendGrantRoleNotification(correlationId: string, message: MessageV1, role: string, 
            userId: string, organization: OrganizationV1): Promise<void> {

        if (this._messageDistributionClient == null) return;
        if (message == null) return;

        let parameters = ConfigParams.fromTuples(
            'role', role,
            'org_id', organization.id,
            'organization_name', organization.name,
            'create_time', new Date()
        );
        
        try {
            await this._messageDistributionClient.sendMessageToRecipient(
                correlationId, userId, null, message, parameters, DeliveryMethodV1.Email
            );
        } catch(err) {
            this._logger.error(correlationId, err, 'Failed to send message');
        }
    }
    
}
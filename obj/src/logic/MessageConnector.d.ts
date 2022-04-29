import { ILogger } from 'pip-services3-components-nodex';
import { MessageV1 } from 'client-msgdistribution-node';
import { MessageResolverV1 } from 'client-msgdistribution-node';
import { IMessageDistributionClientV1 } from 'client-msgdistribution-node';
import { OrganizationV1 } from 'client-organizations-node';
export declare class MessageConnector {
    private _logger;
    private _messageResolver;
    private _messageDistributionClient;
    constructor(_logger: ILogger, _messageResolver: MessageResolverV1, _messageDistributionClient: IMessageDistributionClientV1);
    sendGrantRoleNotification(correlationId: string, message: MessageV1, role: string, userId: string, organization: OrganizationV1): Promise<void>;
}

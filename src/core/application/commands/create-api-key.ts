import crypto from 'crypto';

import OrganizationRepository from '@/core/application/interfaces/organization-repository';
import ApiKeyRepository from '@/core/application/interfaces/api-key-repository';

export type CreateApiKeyInput = {
    organizationSalesforceId: string;
};

export type CreateApiKeyOutput = {
    key: string;
};

export class CreateApiKeyService {
    private organizationRepository: OrganizationRepository;
    private apiKeyRepository: ApiKeyRepository;

    constructor ({
        organizationRepository,
        apiKeyRepository,
    }: {
        organizationRepository: OrganizationRepository;
        apiKeyRepository: ApiKeyRepository;
    }) {
        this.organizationRepository = organizationRepository;
        this.apiKeyRepository = apiKeyRepository;
    }

    public async execute ({
        organizationSalesforceId,
    }: CreateApiKeyInput): Promise<CreateApiKeyOutput> {
        const organization = await this.organizationRepository.findOrganizationBySalesforceId(organizationSalesforceId);

        if (!organization) {
            throw new Error(`Organization with Salesforce ID ${organizationSalesforceId} not found.`);
        }

        const apiKey = {
            key: this.generateInsecureKey(),
            organizationId: organization.id,
        }

        await this.apiKeyRepository.saveApiKey(apiKey);

        return {
            key: apiKey.key,
        };
    }

    private generateInsecureKey (): string {
        return crypto.randomBytes(32).toString('hex');
    } 
}

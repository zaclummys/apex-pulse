import crypto from 'crypto';

import OrganizationRepository from '@/core/application/interfaces/organization-repository';
import ApiKeyRepository from '@/core/application/interfaces/api-key-repository';
import ApiKey from '@/core/domain/api-key';

export type CreateApiKeyInput = {
    name: string;
    organizationId: string;
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
        name,
        organizationId,
    }: CreateApiKeyInput): Promise<CreateApiKeyOutput> {
        const organization = await this.organizationRepository.findOrganizationById(organizationId);

        if (!organization) {
            throw new Error(`Organization with ID ${organizationId} not found.`);
        }

        const apiKey: ApiKey = {
            key: this.generateInsecureKey(),
            name: name,
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

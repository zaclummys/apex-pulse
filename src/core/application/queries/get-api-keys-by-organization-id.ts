import ApiKeyRepository from '@/core/application/interfaces/api-key-repository';

export type ApiKeyOutput = {
    id: string;
    name: string;
    createdAt: Date;
};

export class GetApiKeysByOrganizationIdService {
    private apiKeyRepository: ApiKeyRepository;

    constructor (apiKeyRepository: ApiKeyRepository) {
        this.apiKeyRepository = apiKeyRepository;
    }

    public async execute (organizationId: string): Promise<ApiKeyOutput[]> {
        const apiKeys = await this.apiKeyRepository.findApiKeysByOrganizationId(organizationId);

        return apiKeys.map(({ id, name, createdAt }) => {
            if (!id) {
                throw new Error('API key ID is missing');
            }

            if (!createdAt) {
                throw new Error('API key creation date is missing');
            }

            return {
                id,
                name,
                createdAt,
            };
        });
    }
}

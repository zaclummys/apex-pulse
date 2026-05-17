import ApiKeyRepository from '@/core/application/interfaces/api-key-repository';

export type ValidateApiKeyInput = {
    key: string;
    organizationId: string;
};

export class ValidateApiKeyService {
    private apiKeyRepository: ApiKeyRepository;

    constructor (apiKeyRepository: ApiKeyRepository) {
        this.apiKeyRepository = apiKeyRepository;
    }

    public async execute ({ key, organizationId }: ValidateApiKeyInput): Promise<boolean> {
        const apiKey = await this.apiKeyRepository.findApiKeyByKey(key);

        if (!apiKey) {
            return false;
        }

        return apiKey.organizationId === organizationId;
    }
}

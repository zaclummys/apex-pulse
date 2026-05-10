import ApiKeyRepository from '@/core/application/interfaces/api-key-repository';

export type DestroyApiKeyInput = {
    id: string;
};

export class DestroyApiKeyService {
    private apiKeyRepository: ApiKeyRepository;

    constructor (apiKeyRepository: ApiKeyRepository) {
        this.apiKeyRepository = apiKeyRepository;
    }

    public async execute ({ id }: DestroyApiKeyInput): Promise<void> {
        await this.apiKeyRepository.deleteApiKey(id);
    }
}

import ApiKey from '@/core/domain/api-key';

export default interface ApiKeyRepository {
    saveApiKey (apiKey: ApiKey): Promise<void>;
    findApiKeyByKey (key: string): Promise<ApiKey | null>;
}
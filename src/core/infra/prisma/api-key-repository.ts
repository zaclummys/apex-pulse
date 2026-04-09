import prisma from '@/core/infra/prisma/client';
import ApiKey from '@/core/domain/api-key';
import ApiKeyRepository from '@/core/application/interfaces/api-key-repository';

export default class PrismaApiKeyRepository implements ApiKeyRepository {
    public async saveApiKey (apiKey: ApiKey) {
        await prisma.apiKey.create({
            data: {
                id: apiKey.id,
                key: apiKey.key,
                name: apiKey.name,
                createdAt: apiKey.createdAt,
                organizationId: apiKey.organizationId,
            },
        });
    }

    public async findApiKeyByKey (key: string) {
        return await prisma.apiKey.findUnique({
            where: {
                key,
            },
        });
    }
}
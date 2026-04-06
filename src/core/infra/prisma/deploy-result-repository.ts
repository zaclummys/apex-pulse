import { DeployResult } from '@/core/domain/deploy-result';
import DeployResultRepository from '@/core/application/interfaces/deploy-result-repository';

export default class PrismaDeployResultRepository implements DeployResultRepository {
    private prisma: any;

    constructor (prisma: any) {
        this.prisma = prisma;
    }

    public async saveDeployResult (deployResult: DeployResult): Promise<void> {
        // TODO: Save component successes, component failures, test successes, and test failures
        await this.prisma.deployResult.create({
            data: {
                id: deployResult.id,
                status: deployResult.status,
                organizationId: deployResult.organizationId,
            },
        });
    }
}
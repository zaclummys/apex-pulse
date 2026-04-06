export default class PrismaDeployResultRepository implements DeployResultRepository {
    private prisma: PrismaClient;

    constructor (prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async saveDeployResult (deployResult: DeployResult): Promise<void> {
        await this.prisma.deployResult.create({
            data: {
                id: deployResult.id,
                status: deployResult.status,
                organizationId: deployResult.organizationId,
            },
        });
    }
}
import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export class GetLatestDeploymentsService {
    private deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    public async execute (userId: string) {
        const deployments = await this.deploymentRepository.findLatestDeploymentsByUserId(userId);
        return deployments.map(deployment => deployment.id);
    }
}

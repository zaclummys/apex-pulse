import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export class GetDeploymentsByOrganizationIdService {
    private deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    public async execute (organizationId: string) {
        const deployments = await this.deploymentRepository.findDeploymentsByOrganizationId(organizationId);
        return deployments.map(deployment => deployment.id);
    }
}
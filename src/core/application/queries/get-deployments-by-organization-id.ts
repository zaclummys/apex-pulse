import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export class GetDeploymentsByOrganizationIdService {
    private deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    public async execute (organizationId: string) {
        return await this.deploymentRepository.findDeploymentsByOrganizationId(organizationId);
    }
}
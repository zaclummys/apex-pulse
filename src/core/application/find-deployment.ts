import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export default class FindDeployment {
    private readonly deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    async execute ({ deploymentId, organizationId }: { deploymentId: string, organizationId: string }) {
        return await this.deploymentRepository.findDeployment({
            deploymentId,
            organizationId,
        });
    }
}
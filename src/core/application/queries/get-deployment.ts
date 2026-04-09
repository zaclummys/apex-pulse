import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export type GetDeploymentParams = {
    deploymentId: string;
    organizationId: string;
};

export class GetDeploymentService {
    private readonly deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    async execute ({ deploymentId, organizationId }: GetDeploymentParams) {
        return await this.deploymentRepository.findDeployment({
            deploymentId,
            organizationId,
        });
    }
}
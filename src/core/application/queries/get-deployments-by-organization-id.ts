import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export type GetDeploymentsByOrganizationIdParams = {
    organizationId: string;
};

export class GetDeploymentsByOrganizationIdService {
    private deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    public async execute ({ organizationId }: GetDeploymentsByOrganizationIdParams): Promise<any[]> {
        return await this.deploymentRepository.findDeploymentsByOrganizationId(organizationId);
    }
}
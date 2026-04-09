import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export class GetDeploymentByIdService {
    private readonly deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    async execute (id: string) {
        return await this.deploymentRepository.findDeploymentById(id);
    }
}
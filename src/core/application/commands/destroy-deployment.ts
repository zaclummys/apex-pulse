import DeploymentRepository from "@/core/application/interfaces/deployment-repository";

export type DestroyDeploymentInput = {
    id: string;
};

export class DestroyDeploymentService {
    private deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    public async execute ({ id }: DestroyDeploymentInput): Promise<void> {
        const deployment = await this.deploymentRepository.findDeploymentById(id);

        if (!deployment) {
            throw new Error('Deployment not found');
        }

        await this.deploymentRepository.deleteDeployment(id);
    }
}

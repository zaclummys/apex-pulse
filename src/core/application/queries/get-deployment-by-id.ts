import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export class GetDeploymentByIdService {
    private readonly deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    async execute (id: string) {
        const deployment = await this.deploymentRepository.findDeploymentById(id);

        if (!deployment) {
            throw new Error('Deployment not found');
        }

        return {
            id: deployment.id,
            
            status: deployment.status,
            organizationId: deployment.organizationId,
            numberComponentsDeployed: deployment.numberComponentsDeployed,
            numberComponentErrors: deployment.numberComponentErrors,
            numberComponentsTotal: deployment.numberComponentsTotal,
            numberTestErrors: deployment.numberTestErrors,
            numberTestsCompleted: deployment.numberTestsCompleted,
            numberTestsTotal: deployment.numberTestsTotal,
            createdBy: deployment.createdBy,
            createdByName: deployment.createdByName,
            startDate: deployment.startDate,
            endDate: deployment.endDate,
            checkOnly: deployment.checkOnly,
            deployUrl: deployment.deployUrl,

            componentSuccesses: deployment.componentSuccesses,
            componentFailures: deployment.componentFailures,
            testSuccesses: deployment.testSuccesses,
            testFailures: deployment.testFailures,
            codeCoverages: deployment.codeCoverages,
        }
    }
}
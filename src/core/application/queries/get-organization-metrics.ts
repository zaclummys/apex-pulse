import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export type OrganizationMetrics = {
    deploymentSuccessRate: number;
    totalDeployments: number;
    successfulDeployments: number;
    failedDeployments: number;
};

export class GetOrganizationMetricsService {
    private readonly deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    computeDeploymentSuccessRate (deployments: { status: string }[]): number {
        const totalDeployments = deployments.length;

        if (totalDeployments === 0) {
            return 0;
        }

        const successfulDeployments = deployments.reduce((count, deployment) => {
            return count + (deployment.status.toLowerCase() === 'succeeded' ? 1 : 0);
        }, 0);

        return Math.round((successfulDeployments / totalDeployments) * 100);
    }

    async execute (organizationId: string): Promise<OrganizationMetrics> {
        const deployments = await this.deploymentRepository.findDeploymentsByOrganizationId(organizationId);

        const totalDeployments = deployments.length;
        const successfulDeployments = deployments.reduce((count, deployment) => {
            return count + (deployment.status.toLowerCase() === 'succeeded' ? 1 : 0);
        }, 0);
        const failedDeployments = totalDeployments - successfulDeployments;
        const deploymentSuccessRate = this.computeDeploymentSuccessRate(deployments);

        return {
            deploymentSuccessRate,
            totalDeployments,
            successfulDeployments,
            failedDeployments,
        };
    }
}

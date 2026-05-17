import { Organization } from '@/core/domain/organization';
import OrganizationRepository from '@/core/application/interfaces/organization-repository';
import DeploymentRepository from '@/core/application/interfaces/deployment-repository';
import { Temporal } from '@js-temporal/polyfill';

export class GetOrganizationByIdService {
    private organizationRepository: OrganizationRepository;
    private deploymentRepository: DeploymentRepository;

    constructor (organizationRepository: OrganizationRepository, deploymentRepository: DeploymentRepository) {
        this.organizationRepository = organizationRepository;
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

    computeAverageDeploymentTime (deployments: { startDate?: Date | null | undefined; endDate?: Date | null | undefined }[]): number {
        if (deployments.length === 0) {
            return 0;
        }

        const totalMs = deployments.reduce((sum, deployment) => {
            if (!deployment.startDate || !deployment.endDate) {
                return sum;
            }

            const start = Temporal.Instant.fromEpochMilliseconds(deployment.startDate.getTime());
            const end = Temporal.Instant.fromEpochMilliseconds(deployment.endDate.getTime());
            return sum + start.until(end).total('milliseconds');
        }, 0);

        return Math.round(totalMs / deployments.length);
    }

    computeAverageDeploymentSize (deployments: { numberComponentsTotal?: number | null | undefined }[]): number {
        if (deployments.length === 0) {
            return 0;
        }

        const total = deployments.reduce((sum, deployment) => sum + (deployment.numberComponentsTotal ?? 0), 0);

        return Math.round(total / deployments.length);
    }

    public async execute (id: string) {
        const organization = await this.organizationRepository.findOrganizationById(id);

        if (!organization) {
            throw new Error('Organization not found');
        }

        const deployments = await this.deploymentRepository.findDeploymentsByOrganizationId(id);

        const totalDeployments = deployments.length;
        const successfulDeployments = deployments.reduce((count, deployment) => {
            return count + (deployment.status.toLowerCase() === 'succeeded' ? 1 : 0);
        }, 0);
        const failedDeployments = totalDeployments - successfulDeployments;
        const deploymentSuccessRate = this.computeDeploymentSuccessRate(deployments);
        const averageDeploymentTimeMs = this.computeAverageDeploymentTime(deployments);
        const averageDeploymentSize = this.computeAverageDeploymentSize(deployments);

        return {
            ...organization,
            deploymentSuccessRate,
            totalDeployments,
            successfulDeployments,
            failedDeployments,
            averageDeploymentTimeMs,
            averageDeploymentSize,
        };
    }
}
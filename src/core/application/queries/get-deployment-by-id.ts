import { Temporal } from '@js-temporal/polyfill';
import DeploymentRepository from '@/core/application/interfaces/deployment-repository';
import { Deployment } from '@/core/domain/deployment';

export class GetDeploymentByIdService {
    private readonly deploymentRepository: DeploymentRepository;

    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    computeDuration (startDate: Date, endDate: Date) {
        const start = Temporal.Instant.fromEpochMilliseconds(startDate.getTime());
        const end = Temporal.Instant.fromEpochMilliseconds(endDate.getTime());
        
        return start.until(end, { largestUnit: 'hours' });
    }

    computeCodeCoverageMetrics (deployment: Deployment) {
        const calculateBelowThresholdPercentage = (
            num: number,
            total: number,
        ) => {
            if (total === 0) {
                return 0;
            }

            return Math.round(num / total * 100);
        }

        const calculateCodeCoveragePercentage = (
            numLocations: number,
            numLocationsNotCovered: number,
        ) => {
            if (numLocations === 0) {
                return 100;
            }
            
            return Math.round((numLocations - numLocationsNotCovered) / numLocations * 100);
        };

        const codeCoverages = deployment.codeCoverages.map(codeCoverage => {
            return {
                ...codeCoverage,
                percentage: calculateCodeCoveragePercentage(
                    codeCoverage.numLocations,
                    codeCoverage.numLocationsNotCovered,
                )
            }
        });
        
        const totalLocations = codeCoverages.reduce((sum, codeCoverage) => sum + codeCoverage.numLocations, 0);
        const totalLocationsNotCovered = codeCoverages.reduce((sum, codeCoverage) => sum + codeCoverage.numLocationsNotCovered, 0);

        const codeCoveragePercent = calculateCodeCoveragePercentage(
            totalLocations,
            totalLocationsNotCovered,
        );

        const numberOfTotalCodeCoverages = codeCoverages.length;

        const numberOfCodeCoveragesBelowThreshold = codeCoverages.reduce((count, codeCoverage) => {
            if (codeCoverage.percentage < 75) {
                return count + 1;
            }

            return count;
        }, 0);

        const codeCoverageBelowThresholdPercent = calculateBelowThresholdPercentage(
            numberOfCodeCoveragesBelowThreshold,
            numberOfTotalCodeCoverages,
        );

        const minCodeCoveragePercentage = codeCoverages
            .map(codeCoverage => codeCoverage.percentage)
            .reduce((min, current) => Math.min(min, current), 1);

        const maxCodeCoveragePercentage = codeCoverages
            .map(codeCoverage => codeCoverage.percentage)
            .reduce((max, current) => Math.max(max, current), 0);

        const minCodeCoverage = codeCoverages.find(codeCoverage => codeCoverage.percentage === minCodeCoveragePercentage);
        const maxCodeCoverage = codeCoverages.find(codeCoverage => codeCoverage.percentage === maxCodeCoveragePercentage);

        return {
            codeCoveragePercent,
            codeCoverageBelowThresholdPercent,
            minCodeCoverage,
            maxCodeCoverage,
        };
    }

    async execute (id: string) {
        const deployment = await this.deploymentRepository.findDeploymentById(id);

        if (!deployment) {
            throw new Error('Deployment not found');
        }

        const {
            codeCoveragePercent,
            codeCoverageBelowThresholdPercent,
            minCodeCoverage,
            maxCodeCoverage,
        } = this.computeCodeCoverageMetrics(deployment);

        const deploymentDuration = this.computeDuration(deployment.startDate, deployment.endDate);

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
            
            codeCoveragePercent,
            codeCoverageBelowThresholdPercent,
            minCodeCoverage,
            maxCodeCoverage,

            deploymentDuration,
        }
    }
}
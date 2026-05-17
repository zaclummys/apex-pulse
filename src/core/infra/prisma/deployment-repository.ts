import prisma from '@/core/infra/prisma/client';

import { Deployment } from '@/core/domain/deployment';
import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export default class PrismaDeploymentRepository implements DeploymentRepository {
    public async findDeploymentsByOrganizationId (organizationId: string) {
        return await prisma.deployment.findMany({
            where: {
                organizationId,
            },
            include: {
                componentSuccesses: true,
                componentFailures: true,
                testSuccesses: true,
                testFailures: true,
                codeCoverages: true,
            },
        });
    }
    
    public async findLatestDeploymentsByUserId (userId: string) {
        return await prisma.deployment.findMany({
            where: {
                Organization: {
                    userId,
                },
            },
            orderBy: {
                startDate: 'desc',
            },
            take: 10,
            include: {
                componentSuccesses: true,
                componentFailures: true,
                testSuccesses: true,
                testFailures: true,
                codeCoverages: true,
            },
        });
    }

    public async findDeploymentById (id: string) {
        return await prisma.deployment.findUnique({
            where: {
                id,
            },
            include: {
                componentSuccesses: true,
                componentFailures: true,
                testSuccesses: true,
                testFailures: true,
                codeCoverages: true,
            },
        });
    }

    public async deleteDeployment (id: string) {
        await prisma.$transaction([
            prisma.deployComponentSuccess.deleteMany({ where: { deploymentId: id } }),
            prisma.deployComponentFailure.deleteMany({ where: { deploymentId: id } }),
            prisma.deployTestSuccess.deleteMany({ where: { deploymentId: id } }),
            prisma.deployTestFailure.deleteMany({ where: { deploymentId: id } }),
            prisma.deployCodeCoverage.deleteMany({ where: { deploymentId: id } }),
            prisma.deployment.delete({ where: { id } }),
        ]);
    }

    public async deleteDeploymentsByOrganizationId (organizationId: string) {
        const deploymentIds = await prisma.deployment.findMany({
            where: { organizationId },
            select: { id: true },
        });

        const ids = deploymentIds.map(d => d.id);

        await prisma.$transaction([
            prisma.deployComponentSuccess.deleteMany({ where: { deploymentId: { in: ids } } }),
            prisma.deployComponentFailure.deleteMany({ where: { deploymentId: { in: ids } } }),
            prisma.deployTestSuccess.deleteMany({ where: { deploymentId: { in: ids } } }),
            prisma.deployTestFailure.deleteMany({ where: { deploymentId: { in: ids } } }),
            prisma.deployCodeCoverage.deleteMany({ where: { deploymentId: { in: ids } } }),
            prisma.deployment.deleteMany({ where: { organizationId } }),
        ]);
    }

    public async saveDeployment (deployResult: Deployment) {
        const componentSuccesses = [];
        const componentFailures = [];
        const testSuccesses = [];
        const testFailures = [];
        const codeCoverages = [];

        if (deployResult.componentSuccesses) {
            for (const success of deployResult.componentSuccesses) {
                componentSuccesses.push({
                    fullName: success.fullName,
                    componentType: success.componentType,
                    changed: success.changed,
                    created: success.created,
                    deleted: success.deleted,
                });
            }
        }

        if (deployResult.componentFailures) {
            for (const failure of deployResult.componentFailures) {
                componentFailures.push({
                    fullName: failure.fullName,
                    componentType: failure.componentType,
                    changed: failure.changed,
                    created: failure.created,
                    deleted: failure.deleted,
                    lineNumber: failure.lineNumber,
                    columnNumber: failure.columnNumber,
                    problem: failure.problem,
                    problemType: failure.problemType,
                });
            }
        }

        if (deployResult.testSuccesses) {
            for (const success of deployResult.testSuccesses) {
                testSuccesses.push({
                    className: success.className,
                    methodName: success.methodName,
                    namespace: success.namespace,
                    time: success.time,
                });
            }
        }

        if (deployResult.testFailures) {
            for (const failure of deployResult.testFailures) {
                testFailures.push({
                    className: failure.className,
                    methodName: failure.methodName,
                    namespace: failure.namespace,
                    message: failure.message,
                    stackTrace: failure.stackTrace,
                    time: failure.time,
                    type: failure.type,
                });
            }
        }

        if (deployResult.codeCoverages) {
            for (const coverage of deployResult.codeCoverages) {
                codeCoverages.push({
                    className: coverage.className,
                    numLocations: coverage.numLocations,
                    numLocationsNotCovered: coverage.numLocationsNotCovered,
                });
            }
        }

        const savedDeployment= await prisma.deployment.create({
            data: {
                organizationId: deployResult.organizationId,

                status: deployResult.status,
                createdBy: deployResult.createdBy,
                createdByName: deployResult.createdByName,

                startDate: deployResult.startDate,
                endDate: deployResult.endDate,

                numberComponentsDeployed: deployResult.numberComponentsDeployed,
                numberComponentErrors: deployResult.numberComponentErrors,
                numberComponentsTotal: deployResult.numberComponentsTotal,

                numberTestErrors: deployResult.numberTestErrors,
                numberTestsCompleted: deployResult.numberTestsCompleted,
                numberTestsTotal: deployResult.numberTestsTotal,

                checkOnly: deployResult.checkOnly,
                deployUrl: deployResult.deployUrl,

                componentSuccesses: {
                    createMany: {
                        data: componentSuccesses,
                    },
                },

                componentFailures: {
                    createMany: {
                        data: componentFailures,
                    },
                },

                testSuccesses: {
                    createMany: {
                        data: testSuccesses,
                    },
                },

                testFailures: {
                    createMany: {
                        data: testFailures,
                    },
                },

                codeCoverages: {
                    createMany: {
                        data: codeCoverages,
                    },
                },
            },
        });

        return savedDeployment.id;
    }
}
import prisma from '@/core/infra/prisma/client';

import { Deployment } from '@/core/domain/deployment';
import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

export default class PrismaDeploymentRepository implements DeploymentRepository {
    public async findDeploymentsByOrganizationId (organizationId: string): Promise<Deployment[]> {
        return await prisma.deployment.findMany({
            where: {
                organizationId,
            },
            include: {
                componentSuccesses: true,
                componentFailures: true,
                testSuccesses: true,
                testFailures: true,
            },
        });
    }
    
    public async findDeployment ({ deploymentId, organizationId }: { deploymentId: string, organizationId: string }): Promise<Deployment | null> {
        return await prisma.deployment.findUnique({
            where: {
                deploymentId,
                organizationId,
            },
            include: {
                componentSuccesses: true,
                componentFailures: true,
                testSuccesses: true,
                testFailures: true,
            },
        });
    }

    public async saveDeployment (deployResult: Deployment): Promise<void> {
        await prisma.deployment.create({
            data: {
                deploymentId: deployResult.id,
                status: deployResult.status,
                organizationId: deployResult.organizationId,
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
                        data: deployResult.componentSuccesses.map(success => ({
                            fullName: success.fullName,
                            componentType: success.componentType,
                            changed: success.changed,
                            created: success.created,
                            deleted: success.deleted,
                        })),
                    },
                },

                componentFailures: {
                    createMany: {
                        data: deployResult.componentFailures.map(failure => ({
                            fullName: failure.fullName,
                            componentType: failure.componentType,
                            changed: failure.changed,
                            created: failure.created,
                            deleted: failure.deleted,
                            lineNumber: failure.lineNumber,
                            columnNumber: failure.columnNumber,
                            problem: failure.problem,
                            problemType: failure.problemType,
                        })),
                    },
                },

                testSuccesses: {
                    createMany: {
                        data: deployResult.testSuccesses.map(success => ({
                            id: success.id,
                            className: success.className,
                            methodName: success.methodName,
                            namespace: success.namespace,
                            time: success.time,
                        })),
                    },
                },

                testFailures: {
                    createMany: {
                        data: deployResult.testFailures.map(failure => ({
                            id: failure.id,
                            className: failure.className,
                            methodName: failure.methodName,
                            namespace: failure.namespace,
                            message: failure.message,
                            stackTrace: failure.stackTrace,
                            time: failure.time,
                            type: failure.type,
                        })),
                    },
                },
            },
        });
    }
}
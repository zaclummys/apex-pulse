import { PrismaClient } from "@/generated/prisma/client";
import { DeployResult } from '@/core/domain/deploy-result';

import DeployResultRepository from '@/core/application/interfaces/deploy-result-repository';

export default class PrismaDeployResultRepository implements DeployResultRepository {
    private prisma: PrismaClient;

    constructor (prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async saveDeployResult (deployResult: DeployResult): Promise<void> {
        // TODO: Save component successes, component failures, test successes, and test failures
        await this.prisma.deployResult.create({
            data: {
                id: deployResult.id,
                status: deployResult.status,
                organizationId: deployResult.organizationId,
                createdBy: deployResult.createdBy,
                createdByName: deployResult.createdByName,

                startDate: deployResult.startDate,
                completedDate: deployResult.completedDate,

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

                runTestSuccesses: {
                    createMany: {
                        data: deployResult.testSuccesses.map(success => ({
                            id: success.id,
                            name: success.name,
                            methodName: success.methodName,
                            namespace: success.namespace,
                            time: success.time,
                        })),
                    },
                },

                runTestFailures: {
                    createMany: {
                        data: deployResult.testFailures.map(failure => ({
                            id: failure.id,
                            name: failure.name,
                            methodName: failure.methodName,
                            message: failure.message,
                            stackTrace: failure.stackTrace,
                            namespace: failure.namespace,
                            time: failure.time,
                            type: failure.type,
                        })),
                    },
                },
            },
        });
    }
}
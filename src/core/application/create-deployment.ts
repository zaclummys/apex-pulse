import { Deployment } from '@/core/domain/deployment';
import DeploymentRepository from '@/core/application/interfaces/deployment-repository';

type DeployResponseJson = {
    result: DeployResultJson;
}

type DeployResultJson = {
    id: string;
    status: string;

    createdBy: string;
    createdByName: string;

    startDate: string;
    completedDate: string;
    
    numberComponentsDeployed: number;
    numberComponentErrors: number;
    numberComponentsTotal: number;
    
    numberTestErrors: number;
    numberTestsCompleted: number;
    numberTestsTotal: number;

    checkOnly: boolean;
    deployUrl: string;
    
    details: DeployDetailsJson;
};

type DeployDetailsJson = {
    componentSuccesses: DeployMessageSuccessJson[];
    componentFailures: DeployMessageFailureJson[];
    runTestResult: RunTestResultJson;
}

type RunTestResultJson = {
    successes: RunTestSuccessJson[];
    failures: RunTestFailureJson[];
}

type DeployMessageSuccessJson = {
    changed: boolean;
    componentType: string;
    created: boolean;
    createdDate: string;
    deleted: boolean;
    fileName: string;
    fullName: string;
    id: string;
}

type DeployMessageFailureJson = {
    changed: boolean;
    columnNumber: number;
    componentType: string;
    created: boolean;
    createdDate: string;
    deleted: boolean;
    fileName: string;
    fullName: string;
    lineNumber: number;
    problem: string;
    problemType: string;
}

type RunTestSuccessJson = {
    id: string;
    name: string;
    methodName: string;
    namespace: string;
    time: number;
}

type RunTestFailureJson = {
    id: string;
    name: string;
    methodName: string;
    namespace: string;
    message: string;
    stackTrace: string;
    time: number;
    type: string;
}

type CreateDeploymentParams = {
    organizationId: string;
    deployResponse: DeployResponseJson;
};

export default class CreateDeployment {
    private deploymentRepository: DeploymentRepository;
    
    constructor (deploymentRepository: DeploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }
    public async execute ({
        organizationId,
        deployResponse,
    }: CreateDeploymentParams): Promise<{ organizationId: string; deploymentId: string }> {
        const deployResult: Deployment = {
            organizationId,
            id: deployResponse.result.id,
            status: deployResponse.result.status,

            createdBy: deployResponse.result.createdBy,
            createdByName: deployResponse.result.createdByName,

            startDate: new Date(deployResponse.result.startDate),
            endDate: new Date(deployResponse.result.completedDate),

            checkOnly: deployResponse.result.checkOnly,
            deployUrl: deployResponse.result.deployUrl,

            numberComponentsDeployed: deployResponse.result.numberComponentsDeployed,
            numberComponentErrors: deployResponse.result.numberComponentErrors,
            numberComponentsTotal: deployResponse.result.numberComponentsTotal,

            numberTestErrors: deployResponse.result.numberTestErrors,
            numberTestsCompleted: deployResponse.result.numberTestsCompleted,
            numberTestsTotal: deployResponse.result.numberTestsTotal,

            componentSuccesses: deployResponse.result.details.componentSuccesses
                .filter(success => success.componentType === 'ApexClass')
                .map((success) => ({
                    fullName: success.fullName,
                    componentType: success.componentType,
                    changed: success.changed,
                    created: success.created,
                    deleted: success.deleted,
                })),

            componentFailures: deployResponse.result.details.componentFailures
                .filter(failure => failure.componentType === 'ApexClass')
                .map((failure) => ({
                    fullName: failure.fullName,
                    lineNumber: failure.lineNumber,
                    columnNumber: failure.columnNumber,
                    componentType: failure.componentType,
                    changed: failure.changed,
                    created: failure.created,
                    deleted: failure.deleted,
                    problem: failure.problem,
                    problemType: failure.problemType,
                })),

            testSuccesses: deployResponse.result.details.runTestResult.successes.map((success) => ({
                className: success.name,
                methodName: success.methodName,
                namespace: success.namespace,
                id: success.id,
                time: success.time,
            })),

            testFailures: deployResponse.result.details.runTestResult.failures.map((failure) => ({
                id: failure.id,
                className: failure.name,
                methodName: failure.methodName,
                namespace: failure.namespace,
                message: failure.message,
                stackTrace: failure.stackTrace,
                time: failure.time,
                type: failure.type,
            })),
        };

        await this.deploymentRepository.saveDeployment(deployResult);

        return {
            organizationId,
            deploymentId: deployResult.id,
        };
    }
}

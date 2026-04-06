import { DeployResult } from '../domain/deploy-result';

type DeployResultJson = {
    id: string;
    status: string;
    details: DeployDetailsJson;
};

type DeployDetailsJson = {
    componentSuccesses: DeployMessageJson[];
    componentFailures: DeployMessageJson[];
    testSuccesses: RunTestSuccessJson[];
    testFailures: RunTestFailureJson[];
}

type DeployMessageJson = {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    message: string;
    type: string;
    changed: boolean;
}

type RunTestSuccessJson = {
    name: string;
    methodName: string;
    namespace: string;
}

type RunTestFailureJson = {
    name: string;
    methodName: string;
    message: string;
    stackTrace: string;
}

type CreateDeployResultParams = {
    organizationId: string;
    deployResultJson: DeployResultJson;
};

interface DeployResultRepository {
    saveDeployResult (deployResult: DeployResult): void;
}

export default class CreateDeployResult {
    private deployResultRepository: DeployResultRepository;
    
    constructor ({
        deployResultRepository
    }: {
        deployResultRepository: DeployResultRepository;
    }) {
        this.deployResultRepository = deployResultRepository;
    }
    public execute ({
        organizationId,
        deployResultJson,
    }: CreateDeployResultParams): void {
        const deployResult = {
            organizationId,
            id: deployResultJson.id,
            status: deployResultJson.status,

            componentSuccesses: deployResultJson.details.componentSuccesses.map((success) => ({
                fileName: success.fileName,
                lineNumber: success.lineNumber,
                columnNumber: success.columnNumber,
                message: success.message,
                type: success.type,
                changed: success.changed,
            })),

            componentFailures: deployResultJson.details.componentFailures.map((failure) => ({
                fileName: failure.fileName,
                lineNumber: failure.lineNumber,
                columnNumber: failure.columnNumber,
                message: failure.message,
                type: failure.type,
                changed: failure.changed,
            })),

            testSuccesses: deployResultJson.details.testSuccesses.map((success) => ({
                name: success.name,
                methodName: success.methodName,
                namespace: success.namespace,
            })),

            testFailures: deployResultJson.details.testFailures.map((failure) => ({
                name: failure.name,
                methodName: failure.methodName,
                message: failure.message,
                stackTrace: failure.stackTrace,
            })),
        };

        this.deployResultRepository.saveDeployResult(deployResult);
    }
}

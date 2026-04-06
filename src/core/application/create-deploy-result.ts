import { DeployResult } from '../domain/deploy-result';

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

type CreateDeployResultParams = {
    organizationId: string;
    deployResponseJson: DeployResponseJson;
};

interface DeployResultRepository {
    saveDeployResult (deployResult: DeployResult): Promise<void>;
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
    public async execute ({
        organizationId,
        deployResponseJson,
    }: CreateDeployResultParams): Promise<void> {
        const deployResult: DeployResult = {
            organizationId,
            id: deployResponseJson.result.id,
            status: deployResponseJson.result.status,

            createdBy: deployResponseJson.result.createdBy,
            createdByName: deployResponseJson.result.createdByName,

            startDate: new Date(deployResponseJson.result.startDate),
            endDate: new Date(deployResponseJson.result.completedDate),

            checkOnly: deployResponseJson.result.checkOnly,
            deployUrl: deployResponseJson.result.deployUrl,

            numberComponentsDeployed: deployResponseJson.result.numberComponentsDeployed,
            numberComponentErrors: deployResponseJson.result.numberComponentErrors,
            numberComponentsTotal: deployResponseJson.result.numberComponentsTotal,

            numberTestErrors: deployResponseJson.result.numberTestErrors,
            numberTestsCompleted: deployResponseJson.result.numberTestsCompleted,
            numberTestsTotal: deployResponseJson.result.numberTestsTotal,

            componentSuccesses: deployResponseJson.result.details.componentSuccesses
                .filter(success => success.componentType === 'ApexClass')
                .map((success) => ({
                    fullName: success.fullName,
                    componentType: success.componentType,
                    changed: success.changed,
                    created: success.created,
                    deleted: success.deleted,
                })),

            componentFailures: deployResponseJson.result.details.componentFailures
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

            runTestSuccesses: deployResponseJson.result.details.runTestResult.successes.map((success) => ({
                className: success.name,
                methodName: success.methodName,
                namespace: success.namespace,
                id: success.id,
                time: success.time,
            })),

            runTestFailures: deployResponseJson.result.details.runTestResult.failures.map((failure) => ({
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

        await this.deployResultRepository.saveDeployResult(deployResult);
    }
}

import { DeployResult } from '../domain/deploy-result';

type DeployResponseJson = {
    result: DeployResultJson;
}

type DeployResultJson = {
    id: string;
    status: string;
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
    //   "changed": true,
    //   "componentType": "ApexClass",
    //   "created": false,
    //   "createdDate": "2026-04-05T23:59:41.000Z",
    //   "deleted": false,
    //   "fileName": "classes/MyClassName.cls",
    //   "fullName": "MyClassName",
    //   "id": "01pak00000NfciPAAR",
    //   "success": true
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
    // "changed": false,
    // "columnNumber": 5,
    // "componentType": "ApexClass",
    // "created": false,
    // "createdDate": "2026-04-05T23:55:28.000Z",
    // "deleted": false,
    // "fileName": "classes/MyClassName.cls",
    // "fullName": "MyClassName",
    // "lineNumber": 4,
    // "problem": "Missing ';' at '}'",
    // "problemType": "Error",
    // "success": false
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
    // "id": "01pak00000FUcVSAA1",
    // "methodName": "testGetAccount",
    // "name": "GetAccountServiceTest",
    // "namespace": null,
    // "time": 265
    id: string;
    name: string;
    methodName: string;
    namespace: string;
    time: number;
}

type RunTestFailureJson = {
    name: string;
    methodName: string;
    message: string;
    stackTrace: string;
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

            componentSuccesses: deployResponseJson.result.details.componentSuccesses
                .filter(success => success.componentType === 'ApexClass')
                .map((success) => ({
                    fullName: success.fullName,
                    componentType: success.componentType,
                    changed: success.changed,
                    created: success.created,
                    deleted: success.deleted,
                })),

            componentFailures: deployResponseJson.result.details.componentFailures.map((failure) => ({
                fullName: failure.fullName,
                lineNumber: failure.lineNumber,
                columnNumber: failure.columnNumber,
                componentType: failure.componentType,
                changed: failure.changed,
                created: failure.created,
                deleted: failure.deleted,
            })),

            testSuccesses: deployResponseJson.result.details.runTestResult.successes.map((success) => ({
                name: success.name,
                methodName: success.methodName,
                namespace: success.namespace,
                id: success.id,
                time: success.time,
            })),

            testFailures: deployResponseJson.result.details.runTestResult.failures.map((failure) => ({
                name: failure.name,
                methodName: failure.methodName,
                message: failure.message,
                stackTrace: failure.stackTrace,
            })),
        };

        await this.deployResultRepository.saveDeployResult(deployResult);
    }
}

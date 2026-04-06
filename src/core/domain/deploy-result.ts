export type DeployResult = {
    id: string;
    status: string;
    organizationId: string;
    componentSuccesses: DeployMessageSuccess[];
    componentFailures: DeployMessageFailure[];
    testSuccesses: RunTestSuccess[];
    testFailures: RunTestFailure[];
}

export type DeployMessageSuccess = {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    message: string;
    type: string;
    changed: boolean;
}

export type DeployMessageFailure = {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    message: string;
    type: string;
    changed: boolean;
}

export type RunTestFailure = {
    name: string;
    methodName: string;
    message: string;
    stackTrace: string;
}

export type RunTestSuccess = {
    name: string;
    methodName: string;
    namespace: string;
}
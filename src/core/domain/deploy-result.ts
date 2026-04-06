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
    fullName: string;
    componentType: string;
    changed: boolean;
    created: boolean;
    deleted: boolean;
}

export type DeployMessageFailure = {
    fullName: string;
    lineNumber: number;
    columnNumber: number;
    componentType: string;
    changed: boolean;
    created: boolean;
    deleted: boolean;
}

export type RunTestFailure = {
    name: string;
    methodName: string;
    message: string;
    stackTrace: string;
}

export type RunTestSuccess = {
    id: string;
    name: string;
    methodName: string;
    namespace: string;
    time: number;
}
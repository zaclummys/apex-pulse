export type DeployResult = {
    id: string;
    status: string;

    organizationId: string;

    numberComponentsDeployed: number;
    numberComponentErrors: number;
    numberComponentsTotal: number;

    numberTestErrors: number;
    numberTestsCompleted: number;
    numberTestsTotal: number;

    createdBy: string;
    createdByName: string;

    startDate: Date;
    endDate: Date;

    checkOnly: boolean;
    deployUrl: string;

    componentSuccesses: DeployMessageSuccess[];
    componentFailures: DeployMessageFailure[];

    runTestSuccesses: RunTestSuccess[];
    runTestFailures: RunTestFailure[];
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
    componentType: string;
    lineNumber: number;
    columnNumber: number;
    changed: boolean;
    created: boolean;
    deleted: boolean;
    problem: string;
    problemType: string;
}

export type RunTestSuccess = {
    id: string;
    
    className: string;
    methodName: string;
    namespace: string;

    time: number;
}

export type RunTestFailure = {
    id: string;

    className: string;
    methodName: string;
    namespace: string;

    message: string;
    stackTrace: string;

    time: number;
    type: string;
}
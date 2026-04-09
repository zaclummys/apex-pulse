import { readFile } from 'fs/promises';
import { describe, it, expect, vi } from 'vitest';

import { CreateDeploymentService } from '@/core/application/commands/create-deployment';

describe('Create Deployment', async () => {
    const rawSuccessDeployResponseJson = await readFile('fixtures/success-deploy-response.json', 'utf-8');
    const rawComponentFailureDeployResponseJson = await readFile('fixtures/component-failure-deploy-response.json', 'utf-8');
    const rawTestFailureDeployResponseJson = await readFile('fixtures/test-failure-deploy-response.json', 'utf-8');

    const successDeployResponseJson = JSON.parse(rawSuccessDeployResponseJson);
    const componentFailureDeployResponseJson = JSON.parse(rawComponentFailureDeployResponseJson);
    const testFailureDeployResponseJson = JSON.parse(rawTestFailureDeployResponseJson);

    const deploymentRepository = {
        saveDeployment: vi.fn(),
        findDeploymentsByOrganizationId: vi.fn(),
        findDeployment: vi.fn(),
    };

    it('Should create a deploy result successfully', async () => {
        const createDeployment = new CreateDeploymentService(deploymentRepository);

        await createDeployment.execute({
            organizationId: 'org123',
            deployResponse: successDeployResponseJson
        });

        expect(deploymentRepository.saveDeployment).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: 'org123',
                id: '0Afak00000X387hCAB',
                status: 'Succeeded',
                componentSuccesses: [
                    {
                        componentType: 'ApexClass',
                        changed: true,
                        created: false,
                        deleted: false,
                        fullName: 'MyClassName',
                    }
                ],
                componentFailures: [],
                testSuccesses: [
                    {
                        id: '01pak00000FUcVSAA1',
                        methodName: 'testGetAccount',
                        className: 'GetAccountServiceTest',
                        namespace: null,
                        time: 265,
                    },
                    {
                        id: '01pak00000FUcVUAA1',
                        methodName: 'testDoSomething',
                        className: 'ViolationExampleTest',
                        namespace: null,
                        time: 74,
                    }
                ],
                testFailures: [],
            })
        );
    });

    it('Should create a deploy result with component failures', async () => {
        const createDeployment = new CreateDeploymentService(deploymentRepository);

        await createDeployment.execute({
            organizationId: 'org123',
            deployResponse: componentFailureDeployResponseJson
        });

        expect(deploymentRepository.saveDeployment).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: 'org123',
                componentFailures: [
                    {
                        componentType: 'ApexClass',
                        changed: false,
                        columnNumber: 5,
                        fullName: 'MyClassName',
                        created: false,
                        deleted: false,
                        lineNumber: 4,
                        problem: "Missing ';' at '}'",
                        problemType: "Error",
                    },
                    {
                        componentType: 'ApexClass',
                        changed: false,
                        columnNumber: 9,
                        fullName: 'MyClassName',
                        created: false,
                        deleted: false,
                        lineNumber: 3,
                        problem: "Expression cannot be a statement.",
                        problemType: "Error",
                    }
                ]
            })
        );
    });

    it('Should create a deploy result with test failures', async () => {
        const createDeployment = new CreateDeploymentService(deploymentRepository);

        await createDeployment.execute({
            organizationId: 'org123',
            deployResponse: testFailureDeployResponseJson
        });

        expect(deploymentRepository.saveDeployment).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: 'org123',
                testFailures: [
                    {
                        "id": "01pak00000NfmrRAAR",
                        "message": "System.AssertException: Assertion Failed: Expected: true, Actual: false",
                        "methodName": "failure",
                        "className": "MyClassNameTest",
                        "namespace": null,
                        "stackTrace": "Class.MyClassNameTest.failure: line 10, column 1",
                        "time": 129,
                        "type": "Class"
                    }
                ]
            })
        );
    });
});

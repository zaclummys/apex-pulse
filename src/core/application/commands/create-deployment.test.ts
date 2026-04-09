import { readFile } from 'fs/promises';
import { describe, it, expect, vi } from 'vitest';

import DeploymentRepository from '@/core/application/interfaces/deployment-repository';
import { CreateDeploymentService } from '@/core/application/commands/create-deployment';

describe('Create Deployment', async () => {
    const rawSuccessDeployResponseJson = await readFile('fixtures/success-deploy-response.json', 'utf-8');
    const rawComponentFailureDeployResponseJson = await readFile('fixtures/component-failure-deploy-response.json', 'utf-8');
    const rawTestFailureDeployResponseJson = await readFile('fixtures/test-failure-deploy-response.json', 'utf-8');

    const successDeployResponseJson = JSON.parse(rawSuccessDeployResponseJson);
    const componentFailureDeployResponseJson = JSON.parse(rawComponentFailureDeployResponseJson);
    const testFailureDeployResponseJson = JSON.parse(rawTestFailureDeployResponseJson);

    const organizationRepository = {
        findOrganizationBySalesforceId: vi.fn(),
        findOrganizationById: vi.fn(),
        findOrganizationsByUserId: vi.fn(),
        saveOrganization: vi.fn(),
    };

    const deploymentRepository: DeploymentRepository = {
        saveDeployment: vi.fn(),
        findDeploymentsByOrganizationId: vi.fn(),
        findDeployment: vi.fn(),
        findDeploymentBySalesforceId: vi.fn(),
    };

    const createDeployment = new CreateDeploymentService({
        deploymentRepository,
        organizationRepository,
    });


    it('Should create a deploy result successfully', async () => {
        organizationRepository.findOrganizationBySalesforceId.mockResolvedValue({
            id: 'organization-id',
            name: 'Organization Name',
            salesforceId: 'salesforce-organization-id',
        });

        await createDeployment.execute({
            deployResponse: successDeployResponseJson,
            organizationSalesforceId: 'salesforce-organization-id',
        });

        expect(deploymentRepository.saveDeployment).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: 'organization-id',
                salesforceId: '0Afak00000X387hCAB',
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
        await createDeployment.execute({
            organizationSalesforceId: 'salesforce-organization-id',
            deployResponse: componentFailureDeployResponseJson
        });

        expect(deploymentRepository.saveDeployment).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: 'organization-id',
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
        await createDeployment.execute({
            deployResponse: testFailureDeployResponseJson,
            organizationSalesforceId: 'salesforce-organization-id',
        });

        expect(deploymentRepository.saveDeployment).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: 'organization-id',
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

import { readFile } from 'fs/promises';
import { describe, it, expect, vi } from 'vitest';

import CreateDeployResult from './create-deploy-result';

describe('Create Deploy Result', async () => {
    const rawSuccessDeployResponseJson = await readFile('fixtures/success-deploy-response.json', 'utf-8');
    const rawFailureDeployResponseJson = await readFile('fixtures/failure-deploy-response.json', 'utf-8');

    const successDeployResponseJson = JSON.parse(rawSuccessDeployResponseJson);
    const failureDeployResponseJson = JSON.parse(rawFailureDeployResponseJson);

    it('Should create a deploy result successfully', async () => {
        const deployResultRepository = {
            saveDeployResult: vi.fn(),
        };

        const createDeployResult = new CreateDeployResult({
            deployResultRepository,
        });

        await createDeployResult.execute({
            organizationId: 'org123',
            deployResponseJson: successDeployResponseJson
        });

        expect(deployResultRepository.saveDeployResult).toHaveBeenCalledWith({
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
                    name: 'GetAccountServiceTest',
                    namespace: null,
                    time: 265,
                },
                {
                    id: '01pak00000FUcVUAA1',
                    methodName: 'testDoSomething',
                    name: 'ViolationExampleTest',
                    namespace: null,
                    time: 74,
                }
            ],
            testFailures: []
        });
    });

    it('Should create a deploy result with failures', async () => {
        const deployResultRepository = {
            saveDeployResult: vi.fn(),
        };

        const createDeployResult = new CreateDeployResult({
            deployResultRepository,
        });

        await createDeployResult.execute({
            organizationId: 'org123',
            deployResponseJson: failureDeployResponseJson
        });

        expect(deployResultRepository.saveDeployResult).toHaveBeenCalledWith({
            organizationId: 'org123',
            id: '0Afak00000X37rZCAR',
            status: 'Failed',
            componentSuccesses: [],
            componentFailures: [
                {
                    componentType: 'ApexClass',
                    changed: false,
                    columnNumber: 5,
                    fullName: 'MyClassName',
                    created: false,
                    deleted: false,
                    lineNumber: 4,
                },
                {
                    componentType: 'ApexClass',
                    changed: false,
                    columnNumber: 9,
                    fullName: 'MyClassName',
                    created: false,
                    deleted: false,
                    lineNumber: 3,
                }
            ],
            testSuccesses: [],
            testFailures: []
        });
    });
});

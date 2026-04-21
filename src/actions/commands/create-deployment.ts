'use server';

import { redirect } from 'next/navigation';

import { createDeployment } from '@/core';

async function parseDeployResultJson (deployResultJsonFile: File | null) {
    if (!deployResultJsonFile || deployResultJsonFile.size === 0) {
        return {
            valid: false,
            error: 'Please select a JSON file.',
        };
    }

    const text = await deployResultJsonFile.text();

    try {
        const parsedDeployResultJson = JSON.parse(text);

        return {
            valid: true,
            deployResponse: parsedDeployResultJson,
        };
    } catch {
        return {
            valid: false,
            error: 'Invalid JSON file.',
        };
    }
}

export default async function createDeploymentAction (state: any, formData: FormData) {
    const organizationId = formData.get('organizationId') as string;
    const file = formData.get('deployResponse') as File;

    const { valid, deployResponse, error } = await parseDeployResultJson(file);

    if (!valid) {
        return {
            errors: {
                message: error,
            },
        };
    }

    try {
        const { deploymentId } = await createDeployment({
            organizationId,
            deployResponse,
        });

        redirect(`/dashboard/deployments/${deploymentId}`);
    } catch (error: any) {
        if (error.message === 'NEXT_REDIRECT') {
            throw error;
        }

        console.error('An error occurred while creating the deployment:', error);

        return {
            errors: {
                message: 'Failed to create deployment.',
            },
        };
    }
}

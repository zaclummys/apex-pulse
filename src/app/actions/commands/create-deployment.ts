'use server';

import { redirect } from 'next/navigation';

import { createDeployment } from '@/core';

export default async function createDeploymentAction (state: any, formData: FormData) {
    const organizationId = formData.get('organizationId') as string;
    const file = formData.get('deployResponse') as File;

    if (!file || file.size === 0) {
        return {
            errors: {
                message: 'Please select a JSON file.',
            },
        };
    }

    const text = await file.text();

    let deployResponse;

    try {
        deployResponse = JSON.parse(text);
    } catch {
        return {
            errors: {
                message: 'Invalid JSON file.',
            },
        };
    }

    let deploymentId;

    try {
        const result = await createDeployment({
            organizationId,
            deployResponse,
        });

        deploymentId = result.deploymentId;
    } catch {
        return {
            errors: {
                message: 'Failed to create deployment.',
            },
        };
    }

    redirect(`/dashboard/deployments/${deploymentId}`);
}

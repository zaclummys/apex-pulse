import { NextRequest } from 'next/server';

import {
    getDeployment,
    createDeployment,
} from '@/core';

export async function POST (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const deployResponseJson = await request.json();

    const { deploymentId } = await createDeployment({
        organizationId,
        deployResponse: deployResponseJson
    });
    
    return new Response(null, {
        status: 302,
        headers: {
            Location: `/api/organizations/${organizationId}/deployments/${deploymentId}`,
        },
    });
}
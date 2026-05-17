import { NextRequest } from 'next/server';

import { createDeployment } from '@/core';
import { withApiKey } from '@/lib/api-auth';

async function postDeployment (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const deployResponseJson = await request.json();

    const { deploymentId } = await createDeployment({
        organizationId,
        deployResponse: deployResponseJson,
    });
    
    return new Response(null, {
        status: 302,
        headers: {
            Location: `/api/organizations/${organizationId}/deployments/${deploymentId}`,
        },
    });
}

export const POST = withApiKey(postDeployment);

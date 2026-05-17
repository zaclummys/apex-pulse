import { NextRequest } from 'next/server';

import { destroyDeployment, getDeploymentById } from '@/core';
import { withApiKey } from '@/lib/api-auth';

async function getDeployment (_request: NextRequest, context: any) {
    const { deploymentId } = await context.params;

    const deployment = await getDeploymentById(deploymentId);

    if (!deployment) {
        return new Response(JSON.stringify({ error: 'Deployment not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return Response.json(deployment);
}

async function deleteDeployment (_request: NextRequest, context: any) {
    const { deploymentId } = await context.params;

    await destroyDeployment({ id: deploymentId });

    return new Response(null, { status: 204 });
}

export const GET = withApiKey(getDeployment);
export const DELETE = withApiKey(deleteDeployment);

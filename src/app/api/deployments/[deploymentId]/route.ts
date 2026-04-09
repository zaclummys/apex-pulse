import { NextRequest } from 'next/server';

import { getDeploymentById } from '@/core';

export async function GET (request: NextRequest, context: any) {
    const { deploymentId } = await context.params;

    const deployment = await getDeploymentById(deploymentId);

    if (!deployment) {
        return new Response(null, { status: 404 });
    }

    return Response.json(deployment);
}
import { NextRequest } from 'next/server';

import { getDeployment } from '@/core';

export async function GET (request: NextRequest, context: any) {
    const { organizationId, deploymentId } = await context.params;

    const deployment = await getDeployment({
        deploymentId,
        organizationId,
    });

    if (!deployment) {
        return new Response(null, { status: 404 });
    }

    return Response.json(deployment);
}
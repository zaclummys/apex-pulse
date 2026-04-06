import { NextRequest } from 'next/server';

export async function POST (request: NextRequest, context: any) {
    const { organizationId, deploymentId } = await context.params;
    
    return Response.json({
        organizationId,
        deploymentId,
    });
}
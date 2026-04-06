import { NextRequest } from 'next/server';

import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import CreateDeployment from '@/core/application/create-deployment';

export async function POST (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const deployResponseJson = await request.json();

    const createDeployment = new CreateDeployment(
        new PrismaDeploymentRepository()
    );

    const { deploymentId } = await createDeployment.execute({
        organizationId,
        deployResponse: deployResponseJson
    });

    // redirect
    return new Response(null, {
        status: 302,
        headers: {
            Location: `/api/organizations/${organizationId}/deployments/${deploymentId}`,
        },
    });
}
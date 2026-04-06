import { NextRequest } from 'next/server';

import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import CreateDeployment from '@/core/application/create-deployment';

export async function POST (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const deployResponseJson = await request.json();

    const createDeployment = new CreateDeployment(
        new PrismaDeploymentRepository()
    );

    await createDeployment.execute({
        organizationId,
        deployResponse: deployResponseJson
    });

    return new Response(null, { status: 204 });
}
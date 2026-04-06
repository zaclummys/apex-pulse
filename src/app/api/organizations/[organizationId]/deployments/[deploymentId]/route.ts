import { NextRequest } from 'next/server';

import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import FindDeployment from '@/core/application/find-deployment';

export async function GET (request: NextRequest, context: any) {
    const { organizationId, deploymentId } = await context.params;

    const deploymentRepository = new PrismaDeploymentRepository();
    const findDeployment = new FindDeployment(deploymentRepository);

    const deployment = await findDeployment.execute({ deploymentId, organizationId });

    if (!deployment) {
        return new Response(null, { status: 404 });
    }

    return Response.json(deployment);
}
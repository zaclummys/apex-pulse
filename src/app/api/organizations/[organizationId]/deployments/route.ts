import { NextRequest } from 'next/server';

import PrismaDeployResultRepository from '@/core/infra/prisma/deployment-repository';
import ImportDeployResponse from '@/core/application/create-deployment';

export async function POST (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const deployResponseJson = await request.json();

    const importDeployResponse = new ImportDeployResponse({
        deployResultRepository: new PrismaDeployResultRepository()
    });

    await importDeployResponse.execute({
        organizationId,
        deployResponse: deployResponseJson
    });

    return new Response(null, { status: 204 });
}
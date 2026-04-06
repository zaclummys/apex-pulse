import { NextRequest } from 'next/server';

import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';
import FindOrganization from '@/core/application/find-organization';

export async function GET (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const prismaOrganizationRepository = new PrismaOrganizationRepository();
    const findOrganization = new FindOrganization(prismaOrganizationRepository);

    const organization = await findOrganization.execute(organizationId);

    if (!organization) {
        return new Response(null, { status: 404 });
    }

    return Response.json(organization);
}
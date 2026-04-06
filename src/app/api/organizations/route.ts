import { NextRequest } from 'next/server';

import FindOrganization from '@/core/application/find-organization';
import CreateOrganization from '@/core/application/create-organization';
import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';

export async function POST (request: NextRequest) {
    const body = await request.json();

    const prismaOrganizationRepository = new PrismaOrganizationRepository();

    const findOrganization = new FindOrganization(prismaOrganizationRepository);
    const createOrganization = new CreateOrganization(prismaOrganizationRepository);

    const existingOrganization = await findOrganization.execute(body.id);

    if (existingOrganization) {
        return new Response(null, { status: 400 });
    }

    await createOrganization.execute(body);

    return new Response(null, {
        status: 302,
        headers: {
            Location: `/api/organizations/${body.id}`,
        },
    });
}
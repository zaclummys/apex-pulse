import { NextRequest } from 'next/server';

import FindOrganizationById from '@/core/application/find-organization-by-id';
import CreateOrganization from '@/core/application/create-organization';
import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';

export async function POST (request: NextRequest) {
    const body = await request.json();

    const prismaOrganizationRepository = new PrismaOrganizationRepository();

    const findOrganizationById = new FindOrganizationById(prismaOrganizationRepository);
    const createOrganization = new CreateOrganization(prismaOrganizationRepository);

    const existingOrganization = await findOrganizationById.execute(body.id);

    if (existingOrganization) {
        return new Response(null, { status: 400 });
    }

    await createOrganization.execute(body);

    return new Response(null, { status: 204 });
}
import { NextRequest } from 'next/server';

import { getOrganizationById } from '@/core';

export async function GET (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        return new Response(null, { status: 404 });
    }

    return Response.json(organization);
}
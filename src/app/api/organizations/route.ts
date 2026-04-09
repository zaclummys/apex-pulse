import { NextRequest } from 'next/server';

import { createOrganization } from '@/core';

export async function POST (request: NextRequest) {
    const body = await request.json();

    await createOrganization(body);

    return new Response(null, {
        status: 302,
        headers: {
            Location: `/api/organizations/${body.id}`,
        },
    });
}
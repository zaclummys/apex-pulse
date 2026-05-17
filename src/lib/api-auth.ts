import { NextRequest } from 'next/server';

import { validateApiKey } from '@/core';

type RouteHandler = (request: NextRequest, context: any) => Promise<Response>;

export function withApiKey (handler: RouteHandler): RouteHandler {
    return async (request: NextRequest, context: any) => {
        const { organizationId } = await context.params;
        const apiKeyValue = request.headers.get('X-Api-Key');

        if (!apiKeyValue) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        try {
            const isValid = await validateApiKey({ key: apiKeyValue, organizationId });

            if (!isValid) {
                return Response.json({ error: 'Unauthorized' }, { status: 401 });
            }
        } catch {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        return handler(request, context);
    };
}

import { NextRequest } from 'next/server';
import Prisma
export async function GET (request: NextRequest, context: any) {
    const { organizationId, deploymentId } = await context.params;

    return new Response(null, { status: 204 });
}
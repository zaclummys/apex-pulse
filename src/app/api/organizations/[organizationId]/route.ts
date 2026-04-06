import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';
import FindOrganizationById from '@/core/application/find-organization-by-id';

export async function GET (request: NextRequest, context: any) {
    const { organizationId } = await context.params;

    const prismaOrganizationRepository = new PrismaOrganizationRepository();
    const findOrganizationById = new FindOrganizationById(prismaOrganizationRepository);

    const organization = await findOrganizationById.execute(organizationId);

    if (!organization) {
        return new Response(null, { status: 404 });
    }

    return Response.json(organization);
}
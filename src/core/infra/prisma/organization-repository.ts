import prisma from '@/core/infra/prisma/client';

import { Organization } from '@/core/domain/organization';
import OrganizationRepository from '@/core/application/interfaces/organization-repository';

export default class PrismaOrganizationRepository implements OrganizationRepository {
    public async findOrganization (id: string): Promise<Organization | null> {
        return await prisma.organization.findUnique({
            where: {
                id,
            },
        });
    }

    public async saveOrganization (organization: Organization): Promise<void> {
        await prisma.organization.create({
            data: {
                id: organization.id,
                name: organization.name,
            },
        });
    }

    public async findOrganizationsByUserId(userId: string): Promise<Organization[]> {
        return await prisma.organization.findMany({
            where: {
                userId: userId,
            },
        });
    }
}
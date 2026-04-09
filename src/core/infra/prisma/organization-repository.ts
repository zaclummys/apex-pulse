import prisma from '@/core/infra/prisma/client';

import { Organization } from '@/core/domain/organization';
import OrganizationRepository from '@/core/application/interfaces/organization-repository';

export default class PrismaOrganizationRepository implements OrganizationRepository {
    public async findOrganizationById (id: string) {
        return await prisma.organization.findUnique({
            where: {
                id,
            },
        });
    }

    public async saveOrganization (organization: Organization) {
        await prisma.organization.create({
            data: {
                id: organization.id,
                name: organization.name,
                userId: organization.userId,
            },
        });
    }

    public async findOrganizationsByUserId (userId: string) {
        return await prisma.organization.findMany({
            where: {
                userId: userId,
            },
        });
    }
}
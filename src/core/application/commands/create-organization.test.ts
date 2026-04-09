import { describe, it, expect, vi } from 'vitest';

import OrganizationRepository from '@/core/application/interfaces/organization-repository';
import { CreateOrganizationService } from '@/core/application/commands/create-organization';

describe('Create Organization', async () => {
    const organizationRepository: OrganizationRepository = {
        findOrganizationById: vi.fn(),
        findOrganizationBySalesforceId: vi.fn(),
        findOrganizationsByUserId: vi.fn(),
        saveOrganization: vi.fn(),
    };

    it('Should create an organization successfully', async () => {
        const createOrganization = new CreateOrganizationService(organizationRepository);

        await createOrganization.execute({
            name: 'Test Organization',
            userId: 'user123',
            salesforceId: 'org123',
        });

        expect(organizationRepository.saveOrganization).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Test Organization',
                userId: 'user123',
                salesforceId: 'org123',
            })
        );
    });
});
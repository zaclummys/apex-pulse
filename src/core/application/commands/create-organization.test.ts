import { describe, it, expect, vi } from 'vitest';

import { CreateOrganizationService } from '@/core/application/commands/create-organization';

describe('Create Organization', async () => {
    const organizationRepository = {
        findOrganization: vi.fn(),
        saveOrganization: vi.fn(),
        findOrganizationsByUserId: vi.fn(),
    };

    it('Should create an organization successfully', async () => {
        const createOrganization = new CreateOrganizationService(organizationRepository);

        await createOrganization.execute({
            id: 'org123',
            name: 'Test Organization',
        });

        expect(organizationRepository.saveOrganization).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'org123',
                name: 'Test Organization',
            })
        );
    });
});
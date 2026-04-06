import { describe, it, expect, vi } from 'vitest';

import CreateOrganization from '@/core/application/create-organization';

describe('Create Organization', async () => {
    it('Should create an organization successfully', async () => {
        const organizationRepository = {
            findOrganization: vi.fn().mockResolvedValue(null),
            saveOrganization: vi.fn(),
        };

        const createOrganization = new CreateOrganization(organizationRepository);

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
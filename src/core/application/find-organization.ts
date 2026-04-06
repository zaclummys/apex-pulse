import { Organization } from '@/core/domain/organization';
import OrganizationRepository from '@/core/application/interfaces/organization-repository';

export default class FindOrganization {
    private organizationRepository: OrganizationRepository;

    constructor (organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository
    }

    public async execute (organizationId: string): Promise<Organization | null> {
        return await this.organizationRepository.findOrganization(organizationId);
    }
}
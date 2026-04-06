import { Organization } from '@/core/domain/organization';
import OrganizationRepository from '@/core/application/interfaces/organization-repository';

export default class FindOrganizationById {
    private organizationRepository: OrganizationRepository;

    constructor (organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository
    }

    public async execute (id: string): Promise<Organization | null> {
        return await this.organizationRepository.findOrganizationById(id);
    }
}
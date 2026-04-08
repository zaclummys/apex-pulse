import { Organization } from '@/core/domain/organization';
import OrganizationRepository from '@/core/application/interfaces/organization-repository';

export type GetOrganizationParams = {
    organizationId: string;
};

export class GetOrganizationService {
    private organizationRepository: OrganizationRepository;

    constructor (organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public async execute ({ organizationId }: GetOrganizationParams): Promise<Organization | null> {
        return await this.organizationRepository.findOrganization(organizationId);
    }
}
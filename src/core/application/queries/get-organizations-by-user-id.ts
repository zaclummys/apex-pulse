import OrganizationRepository from '@/core/application/interfaces/organization-repository';

export class GetOrganizationsByUserIdService {
    private organizationRepository: OrganizationRepository;

    constructor(organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    async execute (userId: string) {
        return await this.organizationRepository.findOrganizationsByUserId(userId);
    }
}
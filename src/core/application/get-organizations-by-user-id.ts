import OrganizationRepository from '@/core/application/interfaces/organization-repository';

type GetOrganizationsByUserIdParams = {
    userId: string;
};

export class GetOrganizationsByUserIdService {
    private organizationRepository: OrganizationRepository;

    constructor(organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    async execute ({ userId }: GetOrganizationsByUserIdParams) {
        return await this.organizationRepository.findOrganizationsByUserId(userId);
    }
}
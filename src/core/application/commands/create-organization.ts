import OrganizationRepository from "@/core/application/interfaces/organization-repository";
import { Organization } from '@/core/domain/organization';

export type CreateOrganizationInput = {
    name: string;
    userId: string;
    salesforceId: string;
};

export type CreateOrganizationOutput = {
    id: string;
}

export class CreateOrganizationService {
    private organizationRepository: OrganizationRepository;

    constructor (organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public async execute ({
        name,
        userId,
    }: CreateOrganizationInput): Promise<CreateOrganizationOutput> {
        const organization: Organization = {
            name,
            userId,
        };
        
        await this.organizationRepository.saveOrganization(organization);

        return {
            id: organization.id!,
        };
    }
}
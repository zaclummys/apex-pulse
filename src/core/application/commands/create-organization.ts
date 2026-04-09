import OrganizationRepository from "@/core/application/interfaces/organization-repository";

export type CreateOrganizationParams = {
    name: string;
    userId: string;
    salesforceId: string;
};

export class CreateOrganizationService {
    private organizationRepository: OrganizationRepository;

    constructor (organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public async execute ({
        name,
        userId,
        salesforceId,
    }: CreateOrganizationParams): Promise<void> {
        const alreadyExistingOrganization = await this.organizationRepository.findOrganizationBySalesforceId(salesforceId);

        if (alreadyExistingOrganization) {
            throw new Error(`Organization with Salesforce ID ${salesforceId} already exists.`);
        }

        const organization = {
            name,
            userId,
            salesforceId,
        };
        
        await this.organizationRepository.saveOrganization(organization);
    }
}
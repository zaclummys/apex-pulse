import OrganizationRepository from "@/core/application/interfaces/organization-repository";

export type CreateOrganizationParams = {
    id: string;
    name: string;
};

export class CreateOrganizationService {
    private organizationRepository: OrganizationRepository;

    constructor (organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public async execute ({
        id,
        name,
    }: CreateOrganizationParams): Promise<void> {
        const alreadyExistingOrganization = await this.organizationRepository.findOrganization(id);

        if (alreadyExistingOrganization) {
            throw new Error(`Organization with id ${id} already exists.`);
        }
        
        await this.organizationRepository.saveOrganization({
            id,
            name,
        });
    }
}
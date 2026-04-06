import OrganizationRepository from "@/core/application/interfaces/organization-repository";

export default class CreateOrganization {
    private organizationRepository: OrganizationRepository;

    constructor (organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository
    }

    public async execute ({
        id,
        name,
    }: { id: string; name: string }): Promise<void> {
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
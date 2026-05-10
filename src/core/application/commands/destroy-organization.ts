import OrganizationRepository from "@/core/application/interfaces/organization-repository";
import DeploymentRepository from "@/core/application/interfaces/deployment-repository";

export type DestroyOrganizationInput = {
    id: string;
};

export class DestroyOrganizationService {
    private organizationRepository: OrganizationRepository;
    private deploymentRepository: DeploymentRepository;

    constructor ({
        organizationRepository,
        deploymentRepository,
    }: {
        organizationRepository: OrganizationRepository;
        deploymentRepository: DeploymentRepository;
    }) {
        this.organizationRepository = organizationRepository;
        this.deploymentRepository = deploymentRepository;
    }

    public async execute ({ id }: DestroyOrganizationInput): Promise<void> {
        const organization = await this.organizationRepository.findOrganizationById(id);

        if (!organization) {
            throw new Error('Organization not found');
        }

        await this.deploymentRepository.deleteDeploymentsByOrganizationId(id);
        await this.organizationRepository.deleteOrganization(id);
    }
}

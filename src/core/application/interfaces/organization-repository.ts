import { Organization } from '@/core/domain/organization';

export default interface OrganizationRepository {
    findOrganization (organizationId: string): Promise<Organization | null>;
    saveOrganization (organization: Organization): Promise<void>;
}
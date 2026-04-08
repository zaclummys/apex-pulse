import { Organization } from '@/core/domain/organization';

export default interface OrganizationRepository {
    findOrganizationsByUserId (userId: string): Promise<Organization[]>;
    findOrganization (organizationId: string): Promise<Organization | null>;
    saveOrganization (organization: Organization): Promise<void>;
}
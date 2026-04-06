import { Organization } from '@/core/domain/organization';

export default interface OrganizationRepository {
    saveOrganization (organization: Organization): Promise<void>;
    findOrganizationById (id: string): Promise<Organization | null>;
}
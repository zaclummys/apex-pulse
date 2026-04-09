import { Organization } from '@/core/domain/organization';

type SavedOrganization = Organization & {
    id: string;
};

export default interface OrganizationRepository {
    findOrganizationsByUserId (userId: string): Promise<SavedOrganization[]>;
    findOrganizationById (id: string): Promise<SavedOrganization | null>;
    findOrganizationBySalesforceId (salesforceId: string): Promise<SavedOrganization | null>;
    saveOrganization (organization: Organization): Promise<void>;
}
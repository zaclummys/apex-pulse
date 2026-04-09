import { Organization } from '@/core/domain/organization';

type SavedOrganization = Organization & {
    id: string;
};

export default interface OrganizationRepository {
    findOrganizationById (id: string): Promise<SavedOrganization | null>;
    findOrganizationsByUserId (userId: string): Promise<SavedOrganization[]>;
    saveOrganization (organization: Organization): Promise<void>;
}
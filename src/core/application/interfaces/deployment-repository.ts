import { Deployment } from '@/core/domain/deployment';

type SavedDeployment = Deployment & {
    id: string;
}

export default interface DeploymentRepository {
    findDeploymentById (id: string): Promise<SavedDeployment | null>;
    findDeploymentsByOrganizationId (organizationId: string): Promise<SavedDeployment[]>;
    findLatestDeploymentsByUserId (userId: string): Promise<SavedDeployment[]>;
    saveDeployment (deployment: Deployment): Promise<string>;
}
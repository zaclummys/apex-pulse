import { Deployment } from '@/core/domain/deployment';

export default interface DeploymentRepository {
    findDeploymentById (id: string): Promise<Deployment | null>;
    findDeploymentsByOrganizationId (organizationId: string): Promise<Deployment[]>;
    saveDeployment (deployment: Deployment): Promise<void>;
}
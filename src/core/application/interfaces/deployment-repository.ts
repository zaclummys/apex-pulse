import { Deployment } from '@/core/domain/deployment';

export default interface DeploymentRepository {
    findDeployment ({ deploymentId, organizationId }: { deploymentId: string, organizationId: string }): Promise<Deployment | null>;
    saveDeployment (deployment: Deployment): Promise<void>;
}
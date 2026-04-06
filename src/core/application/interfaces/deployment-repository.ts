import { Deployment } from '@/core/domain/deployment';

export default interface DeploymentRepository {
    saveDeployment (deployment: Deployment): Promise<void>;
}
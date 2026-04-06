import { DeployResult } from '@/core/domain/deploy-result';

export default interface DeployResultRepository {
    saveDeployResult (deployResult: DeployResult): void;
}
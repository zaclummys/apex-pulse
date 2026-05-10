import { DeploymentIcon } from '@/components/icons';

import { getDeploymentsByOrganizationId } from '@/core';

import CreateDeploymentModal from './create-deployment-modal';
import DeploymentTable from '@/app/dashboard/deployment-table';

export default async function DeploymentsSection ({ organizationId }: { organizationId: string }) {
    const deploymentIds = await getDeploymentsByOrganizationId(organizationId);

    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                    <DeploymentIcon className="size-4 text-muted-foreground" />
                    Deployments
                    <span className="text-muted-foreground font-normal">({deploymentIds.length})</span>
                </span>
                <CreateDeploymentModal organizationId={organizationId} />
            </div>

            <DeploymentTable deploymentIds={deploymentIds} showOrganization={false} />
        </section>
    );
}

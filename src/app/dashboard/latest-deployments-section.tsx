import { Rocket } from 'lucide-react';

import getLatestDeploymentsAction from "@/actions/queries/get-latest-deployments";
import getAllOrganizationsAction from "@/actions/queries/get-all-organizations";
import CreateDeploymentModal from "./create-deployment-modal";
import DeploymentTable from "./deployment-table";

export default async function LatestDeploymentsSection() {
    const organizations = await getAllOrganizationsAction();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span>Latest Deployments</span>

                <CreateDeploymentModal organizations={organizations} />
            </div>

            <LatestDeploymentsTable />
        </div>
    );
}

async function LatestDeploymentsTable() {
    const deploymentIds = await getLatestDeploymentsAction();

    return <DeploymentTable deploymentIds={deploymentIds} />;
}

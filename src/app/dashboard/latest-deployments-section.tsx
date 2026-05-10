import getLatestDeploymentsAction from "@/actions/queries/get-latest-deployments";
import DeploymentTable from "./deployment-table";

export default async function LatestDeploymentsSection() {
    const deploymentIds = await getLatestDeploymentsAction();

    return (
        <div className="flex flex-col gap-2">
            <span>Latest Deployments</span>

            <DeploymentTable deploymentIds={deploymentIds} />
        </div>
    );
}

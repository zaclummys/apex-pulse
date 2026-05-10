import Link from "next/link"
import { getOrganizationById } from "@/core"

import { Rocket } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import getLatestDeploymentsAction from "@/actions/queries/get-latest-deployments";
import getAllOrganizationsAction from "@/actions/queries/get-all-organizations";
import CreateDeploymentModal from "./create-deployment-modal";

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
    const deployments = await getLatestDeploymentsAction();

    if (deployments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center">
                <Rocket className="size-10 text-muted-foreground/50" />
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">No deployments yet</span>
                    <span className="text-xs text-muted-foreground">Your latest deployments will appear here once you create one.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Components</TableHead>
                        <TableHead>Tests</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Created By</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deployments.map((deployment) => (
                        <DeploymentRow key={deployment.id} deployment={deployment} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

type DeploymentRowDeployment = {
    id: string;
    status: string;
    organizationId: string;
    numberComponentsDeployed: number;
    numberComponentsTotal: number;
    numberTestsCompleted: number;
    numberTestsTotal: number;
    startDate: Date;
    createdByName: string;
}

type DeploymentRowProps = {
    deployment: DeploymentRowDeployment;
}

async function DeploymentRow({ deployment }: DeploymentRowProps) {
    const organization = await getOrganizationById(deployment.organizationId);

    return (
        <TableRow>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`}>
                    {deployment.id}
                </Link>
            </TableCell>
            <TableCell>{deployment.status}</TableCell>
            <TableCell>
                <Link href={`/dashboard/organizations/${organization?.id}`}>
                    {organization?.name}
                </Link>
            </TableCell>
            <TableCell>{deployment.numberComponentsDeployed}/{deployment.numberComponentsTotal}</TableCell>
            <TableCell>{deployment.numberTestsCompleted}/{deployment.numberTestsTotal}</TableCell>
            <TableCell>{deployment.startDate.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
            <TableCell>{deployment.createdByName}</TableCell>
        </TableRow>
    )
}
import Link from "next/link"
import { getOrganizationById } from "@/core"

import { Button } from '@/components/ui/button';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import getLatestDeploymentsAction from "@/actions/queries/get-latest-deployments";

export default function LatestDeploymentsSection() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span>Latest Deployments</span>

                <Button variant="outline" size="sm">
                    Create deployment
                </Button>
            </div>

            <LatestDeploymentsTable />
        </div>
    );
}

async function LatestDeploymentsTable() {
    const deployments = await getLatestDeploymentsAction();

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
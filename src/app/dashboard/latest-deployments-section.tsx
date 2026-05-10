import Link from "next/link"
import { getOrganizationById } from "@/core"

import { Rocket, User, Calendar, Building2, CheckCircle2, XCircle } from 'lucide-react';

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
                        <TableHead>Status</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Components</TableHead>
                        <TableHead>Tests</TableHead>
                        <TableHead>Check Only</TableHead>
                        <TableHead>Date</TableHead>
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
    numberComponentErrors: number;
    numberTestsCompleted: number;
    numberTestsTotal: number;
    numberTestErrors: number;
    checkOnly: boolean;
    startDate: Date;
    createdByName: string;
}

type DeploymentRowProps = {
    deployment: DeploymentRowDeployment;
}

async function DeploymentRow({ deployment }: DeploymentRowProps) {
    const organization = await getOrganizationById(deployment.organizationId);

    return (
        <TableRow className="cursor-pointer hover:bg-muted/50">
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`}>
                    <StatusBadge status={deployment.status} />
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/organizations/${organization?.id}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Building2 className="size-3.5 shrink-0" />
                    {organization?.name ?? deployment.organizationId}
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="flex items-center gap-1.5 text-muted-foreground">
                    <User className="size-3.5 shrink-0" />
                    {deployment.createdByName}
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="text-sm">
                    <span className="text-green-600 dark:text-green-400">{deployment.numberComponentsDeployed}</span>
                    <span className="text-muted-foreground">/{deployment.numberComponentsTotal}</span>
                    {deployment.numberComponentErrors > 0 && (
                        <span className="ml-1.5 text-red-600 dark:text-red-400">({deployment.numberComponentErrors} err)</span>
                    )}
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="text-sm">
                    <span className="text-green-600 dark:text-green-400">{deployment.numberTestsCompleted}</span>
                    <span className="text-muted-foreground">/{deployment.numberTestsTotal}</span>
                    {deployment.numberTestErrors > 0 && (
                        <span className="ml-1.5 text-red-600 dark:text-red-400">({deployment.numberTestErrors} err)</span>
                    )}
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`}>
                    {deployment.checkOnly
                        ? <CheckCircle2 className="size-4 text-blue-500" />
                        : <XCircle className="size-4 text-muted-foreground/40" />}
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Calendar className="size-3.5 shrink-0" />
                    {deployment.startDate.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </Link>
            </TableCell>
        </TableRow>
    )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const lower = status.toLowerCase();
    const isSuccess = lower === 'succeeded';
    const isFailure = lower === 'failed';

    return (
        <span className={[
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            isSuccess ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
            isFailure ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
            'bg-muted text-muted-foreground',
        ].join(' ')}>
            {isSuccess && <CheckCircle2 className="size-3" />}
            {isFailure && <XCircle className="size-3" />}
            {status}
        </span>
    );
}

import Link from 'next/link';
import { OrganizationIcon, CalendarIcon, UserIcon, SuccessIcon, FailureIcon, DeploymentIcon } from '@/components/icons';
import { getDeploymentById, getOrganizationById } from '@/core';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type DeploymentTableProps = {
    deploymentIds: string[];
    showOrganization?: boolean;
    emptyMessage?: string;
}

export default function DeploymentTable ({ deploymentIds, showOrganization = true, emptyMessage = 'No deployments yet' }: DeploymentTableProps) {
    if (deploymentIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center">
                <DeploymentIcon className="size-10 text-muted-foreground/50" />
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{emptyMessage}</span>
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
                        {showOrganization && <TableHead>Organization</TableHead>}
                        <TableHead>Created By</TableHead>
                        <TableHead>Components</TableHead>
                        <TableHead>Tests</TableHead>
                        <TableHead>Check Only</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deploymentIds.map(id => (
                        <DeploymentRow key={id} id={id} showOrganization={showOrganization} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

async function DeploymentRow ({ id, showOrganization }: { id: string; showOrganization: boolean }) {
    const deployment = await getDeploymentById(id);

    if (!deployment) return null;

    const organization = showOrganization ? await getOrganizationById(deployment.organizationId) : null;

    return (
        <TableRow className="cursor-pointer hover:bg-muted/50">
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`}>
                    <StatusBadge status={deployment.status} />
                </Link>
            </TableCell>
            {showOrganization && (
                <TableCell>
                    <Link href={`/dashboard/organizations/${organization?.id}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <OrganizationIcon className="size-3.5 shrink-0" />
                        {organization?.name ?? deployment.organizationId}
                    </Link>
                </TableCell>
            )}
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="flex items-center gap-1.5 text-muted-foreground">
                    <UserIcon className="size-3.5 shrink-0" />
                    {deployment.createdByName}
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="text-sm">
                    <span className="text-green-600 dark:text-green-400">{deployment.numberComponentsDeployed}</span>
                    <span className="text-muted-foreground">/{deployment.numberComponentsTotal}</span>
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="text-sm">
                    <span className="text-green-600 dark:text-green-400">{deployment.numberTestsCompleted}</span>
                    <span className="text-muted-foreground">/{deployment.numberTestsTotal}</span>
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`}>
                    {deployment.checkOnly
                        ? <SuccessIcon className="size-4 text-blue-500" />
                        : <FailureIcon className="size-4 text-muted-foreground/40" />}
                </Link>
            </TableCell>
            <TableCell>
                <Link href={`/dashboard/deployments/${deployment.id}`} className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <CalendarIcon className="size-3.5 shrink-0" />
                    {new Date(deployment.startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </Link>
            </TableCell>
        </TableRow>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge ({ status }: { status: string }) {
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
            {isSuccess && <SuccessIcon className="size-3" />}
            {isFailure && <FailureIcon className="size-3" />}
            {status}
        </span>
    );
}

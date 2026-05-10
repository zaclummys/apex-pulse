'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OrganizationIcon, CalendarIcon, UserIcon, SuccessIcon, FailureIcon } from '@/components/icons';
import { TableCell, TableRow } from '@/components/ui/table';
import { getDeploymentById, getOrganizationById } from '@/core';

type Deployment = NonNullable<Awaited<ReturnType<typeof getDeploymentById>>>;
type Organization = Awaited<ReturnType<typeof getOrganizationById>>;

type DeploymentRowUIProps = {
    deployment: Deployment;
    organization?: Organization;
};

export default function DeploymentRowUI ({
    deployment,
    organization,
}: DeploymentRowUIProps) {
    const router = useRouter();

    return (
        <TableRow
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => router.push(`/dashboard/deployments/${deployment.id}`)}
        >
            <TableCell>
                <StatusBadge status={deployment.status} />
            </TableCell>
            {organization && (
                <TableCell>
                    <Link
                        href={`/dashboard/organizations/${organization?.id}`}
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <OrganizationIcon className="size-3.5 shrink-0" />
                        {organization?.name ?? deployment.organizationId}
                    </Link>
                </TableCell>
            )}
            <TableCell>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                    <UserIcon className="size-3.5 shrink-0" />
                    {deployment.createdByName}
                </span>
            </TableCell>
            <TableCell className="text-sm">
                <span className="text-green-600 dark:text-green-400">{deployment.numberComponentsDeployed}</span>
                <span className="text-muted-foreground">/{deployment.numberComponentsTotal}</span>
            </TableCell>
            <TableCell className="text-sm">
                <span className="text-green-600 dark:text-green-400">{deployment.numberTestsCompleted}</span>
                <span className="text-muted-foreground">/{deployment.numberTestsTotal}</span>
            </TableCell>
            <TableCell>
                {deployment.checkOnly
                    ? <SuccessIcon className="size-4 text-blue-500" />
                    : <FailureIcon className="size-4 text-muted-foreground/40" />}
            </TableCell>
            <TableCell>
                <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <CalendarIcon className="size-3.5 shrink-0" />
                    {new Date(deployment.startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
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

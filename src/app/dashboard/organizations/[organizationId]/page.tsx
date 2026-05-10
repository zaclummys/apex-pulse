import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, Rocket, Calendar, User, CheckCircle2, XCircle } from 'lucide-react';

import {
    getOrganizationById,
    getDeploymentsByOrganizationId,
} from '@/core';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import CreateDeploymentModal from './create-deployment-modal';
import DestroyOrganizationButton from './destroy-organization-button';

export default async function OrganizationPage ({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        notFound();
    }

    const deployments = await getDeploymentsByOrganizationId(organizationId);

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Building2 className="size-6 text-muted-foreground" />
                    <h1 className="text-xl font-semibold">{organization.name}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <CreateDeploymentModal organizationId={organizationId} />
                    <DestroyOrganizationButton organizationId={organizationId} />
                </div>
            </div>

            {/* Deployments */}
            <section className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 font-medium">
                    <Rocket className="size-4 text-muted-foreground" />
                    Deployments
                    <span className="text-muted-foreground font-normal">({deployments.length})</span>
                </h2>

                {deployments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center">
                        <Rocket className="size-10 text-muted-foreground/50" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium">No deployments yet</p>
                            <p className="text-xs text-muted-foreground">Create your first deployment to get started.</p>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted">
                                <TableRow>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead>Components</TableHead>
                                    <TableHead>Tests</TableHead>
                                    <TableHead>Check Only</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deployments.map(deployment => (
                                    <TableRow key={deployment.id} className="cursor-pointer hover:bg-muted/50">
                                        <TableCell>
                                            <Link href={`/dashboard/deployments/${deployment.id}`} className="flex items-center gap-1.5">
                                                <StatusBadge status={deployment.status} />
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
                                                {new Date(deployment.startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </section>
        </div>
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
            {isSuccess && <CheckCircle2 className="size-3" />}
            {isFailure && <XCircle className="size-3" />}
            {status}
        </span>
    );
}


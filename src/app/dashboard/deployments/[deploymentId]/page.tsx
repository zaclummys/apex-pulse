import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    CheckCircle2,
    XCircle,
    Clock,
    Building2,
    User,
    Calendar,
    Link as LinkIcon,
    Boxes,
    FlaskConical,
    ShieldCheck,
    ChevronRight,
} from 'lucide-react';
import { getOrganizationById } from '@/core';
import getDeploymentByIdAction from '@/actions/queries/get-deployment-by-id';
import DestroyDeploymentButton from './destroy-deployment-button';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';


// ─── Types ───────────────────────────────────────────────────────────────────

type Deployment = NonNullable<Awaited<ReturnType<typeof getDeploymentByIdAction>>>;
type ComponentSuccess = Deployment['componentSuccesses'][number];
type ComponentFailure = Deployment['componentFailures'][number];
type TestSuccess = Deployment['testSuccesses'][number];
type TestFailure = Deployment['testFailures'][number];
type Organization = Awaited<ReturnType<typeof getOrganizationById>>;

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function DeploymentPage({ params }: { params: Promise<{ deploymentId: string }> }) {
    const { deploymentId } = await params;

    const deployment = await getDeploymentByIdAction(deploymentId);

    if (!deployment) {
        notFound();
    }

    const organization = await getOrganizationById(deployment.organizationId);

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-grow flex-row items-center justify-between">
                <span className="text-xl font-semibold">Deployment</span>

                <div className="flex items-center gap-2">
                    {deployment.deployUrl && (
                        <a
                            href={deployment.deployUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <LinkIcon className="size-3.5 shrink-0" />
                            <span className="truncate max-w-xs">{(() => { try { const u = new URL(deployment.deployUrl); return u.hostname + (u.pathname !== '/' ? u.pathname : ''); } catch { return deployment.deployUrl; } })()}</span>
                            <ChevronRight className="size-3 shrink-0 opacity-50" />
                        </a>
                    )}

                    <DestroyDeploymentButton deploymentId={deployment.id} organizationId={deployment.organizationId} />
                </div>
            </div>

            <SummaryCards deployment={deployment} organization={organization} />

            {deployment.componentSuccesses.length > 0 && (
                <section className="flex flex-col gap-2">
                    <SectionHeading icon={<CheckCircle2 className="size-4 text-green-500" />} title="Component Successes" count={deployment.componentSuccesses.length} />
                    <ComponentSuccessesTable rows={deployment.componentSuccesses} />
                </section>
            )}

            {deployment.componentFailures.length > 0 && (
                <section className="flex flex-col gap-2">
                    <SectionHeading icon={<XCircle className="size-4 text-red-500" />} title="Component Failures" count={deployment.componentFailures.length} />
                    <ComponentFailuresTable rows={deployment.componentFailures} />
                </section>
            )}

            {deployment.testSuccesses.length > 0 && (
                <section className="flex flex-col gap-2">
                    <SectionHeading icon={<CheckCircle2 className="size-4 text-green-500" />} title="Test Successes" count={deployment.testSuccesses.length} />
                    <TestSuccessesTable rows={deployment.testSuccesses} />
                </section>
            )}

            {deployment.testFailures.length > 0 && (
                <section className="flex flex-col gap-2">
                    <SectionHeading icon={<XCircle className="size-4 text-red-500" />} title="Test Failures" count={deployment.testFailures.length} />
                    <TestFailuresTable rows={deployment.testFailures} />
                </section>
            )}
        </div>
    );
}

// ─── Summary Cards ───────────────────────────────────────────────────────────

function SummaryCards({ deployment, organization }: { deployment: Deployment; organization: Organization }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldCheck className="size-4 text-muted-foreground" />Overview</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-8 text-sm">
                    <div className="flex flex-col gap-2 flex-1">
                        <InfoRow label="Status" value={<StatusBadge status={deployment.status} />} />
                        <InfoRow
                            icon={<Building2 className="size-3.5" />}
                            label="Organization"
                            value={
                                <Link href={`/dashboard/organizations/${organization?.id}`} className="hover:underline">
                                    {organization?.name ?? deployment.organizationId}
                                </Link>
                            }
                        />
                        <InfoRow icon={<User className="size-3.5" />} label="Created By" value={deployment.createdByName} />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <InfoRow label="Check Only" value={deployment.checkOnly ? <span className="text-blue-600 dark:text-blue-400">Yes</span> : 'No'} />

                        <InfoRow
                            icon={<Calendar className="size-3.5" />}
                            label="Start Date"
                            value={new Date(deployment.startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                        />
                        <InfoRow
                            icon={<Calendar className="size-3.5" />}
                            label="End Date"
                            value={new Date(deployment.endDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Boxes className="size-4 text-muted-foreground" />Components <span className="text-muted-foreground font-normal text-sm">({deployment.numberComponentsTotal})</span></CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                    <InfoRow label="Deployed" value={<span className="font-medium text-green-600 dark:text-green-400">{deployment.numberComponentsDeployed} <span className="font-normal text-muted-foreground">({deployment.numberComponentsTotal > 0 ? Math.round(deployment.numberComponentsDeployed / deployment.numberComponentsTotal * 100) : 0}%)</span></span>} />
                    <InfoRow label="Errors" value={deployment.numberComponentErrors > 0 ? <span className="font-medium text-red-600 dark:text-red-400">{deployment.numberComponentErrors} <span className="font-normal text-red-400/70 dark:text-red-500/70">({deployment.numberComponentsTotal > 0 ? Math.round(deployment.numberComponentErrors / deployment.numberComponentsTotal * 100) : 0}%)</span></span> : <span>0 <span className="text-muted-foreground">(0%)</span></span>} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><FlaskConical className="size-4 text-muted-foreground" />Tests <span className="text-muted-foreground font-normal text-sm">({deployment.numberTestsTotal})</span></CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                    <InfoRow label="Completed" value={<span className="font-medium text-green-600 dark:text-green-400">{deployment.numberTestsCompleted} <span className="font-normal text-muted-foreground">({deployment.numberTestsTotal > 0 ? Math.round(deployment.numberTestsCompleted / deployment.numberTestsTotal * 100) : 0}%)</span></span>} />
                    <InfoRow label="Errors" value={deployment.numberTestErrors > 0 ? <span className="font-medium text-red-600 dark:text-red-400">{deployment.numberTestErrors} <span className="font-normal text-red-400/70 dark:text-red-500/70">({deployment.numberTestsTotal > 0 ? Math.round(deployment.numberTestErrors / deployment.numberTestsTotal * 100) : 0}%)</span></span> : <span>0 <span className="text-muted-foreground">(0%)</span></span>} />
                </CardContent>
            </Card>
        </div>
    );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({ icon, title, count }: { icon: React.ReactNode; title: string; count: number }) {
    return (
        <span className="flex items-center gap-2 font-medium">
            {icon}
            {title}
            <span className="text-muted-foreground font-normal">({count})</span>
        </span>
    );
}

// ─── Tables ──────────────────────────────────────────────────────────────────

function ComponentSuccessesTable({ rows }: { rows: ComponentSuccess[] }) {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Changed</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Deleted</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((c, i) => (
                        <TableRow key={i}>
                            <TableCell>{c.fullName}</TableCell>
                            <TableCell><span className="rounded bg-muted px-1.5 py-0.5 text-xs">{c.componentType}</span></TableCell>
                            <TableCell>{c.changed ? <CheckCircle2 className="size-4 text-green-500" /> : <span className="text-muted-foreground">—</span>}</TableCell>
                            <TableCell>{c.created ? <CheckCircle2 className="size-4 text-blue-500" /> : <span className="text-muted-foreground">—</span>}</TableCell>
                            <TableCell>{c.deleted ? <XCircle className="size-4 text-red-500" /> : <span className="text-muted-foreground">—</span>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function ComponentFailuresTable({ rows }: { rows: ComponentFailure[] }) {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Problem</TableHead>
                        <TableHead>Problem Type</TableHead>
                        <TableHead>Line</TableHead>
                        <TableHead>Column</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((c, i) => (
                        <TableRow key={i} className="bg-red-50/50 dark:bg-red-950/20">
                            <TableCell>{c.fullName}</TableCell>
                            <TableCell><span className="rounded bg-muted px-1.5 py-0.5 text-xs">{c.componentType}</span></TableCell>
                            <TableCell className="max-w-xs truncate text-red-700 dark:text-red-400">{c.problem}</TableCell>
                            <TableCell><span className="rounded bg-red-100 dark:bg-red-900/40 px-1.5 py-0.5 text-xs text-red-700 dark:text-red-400">{c.problemType}</span></TableCell>
                            <TableCell className="text-muted-foreground">{c.lineNumber}</TableCell>
                            <TableCell className="text-muted-foreground">{c.columnNumber}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function TestSuccessesTable({ rows }: { rows: TestSuccess[] }) {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Namespace</TableHead>
                        <TableHead>Time (ms)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((t) => (
                        <TableRow key={t.id}>
                            <TableCell>{t.className}</TableCell>
                            <TableCell>{t.methodName}</TableCell>
                            <TableCell className="text-muted-foreground">{t.namespace ?? '—'}</TableCell>
                            <TableCell>{t.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function TestFailuresTable({ rows }: { rows: TestFailure[] }) {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Namespace</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Time (ms)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((t) => (
                        <TableRow key={t.id} className="bg-red-50/50 dark:bg-red-950/20">
                            <TableCell>{t.className}</TableCell>
                            <TableCell>{t.methodName}</TableCell>
                            <TableCell className="text-muted-foreground">{t.namespace ?? '—'}</TableCell>
                            <TableCell className="max-w-xs truncate text-red-700 dark:text-red-400">{t.message}</TableCell>
                            <TableCell className="text-muted-foreground">{t.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

// ─── Primitives ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const s = status.toLowerCase();
    if (s === 'succeeded') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle2 className="size-3" />
                {status}
            </span>
        );
    }
    if (s === 'failed') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                <XCircle className="size-3" />
                {status}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="size-3" />
            {status}
        </span>
    );
}

function InfoRow({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
    return (
        <div className="flex justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground shrink-0">{icon}{label}</span>
            <span className="text-right">{value}</span>
        </div>
    );
}

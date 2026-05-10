import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Temporal } from '@js-temporal/polyfill';
import {
    CheckCircle2,
    XCircle,
    Clock,
    Timer,
    Building2,
    User,
    Calendar,
    Boxes,
    FlaskConical,
    ShieldCheck,
    Activity,
} from 'lucide-react';
import ExternalLinkButton from '@/components/external-link-button';
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

import { Separator } from '@/components/ui/separator';


// ─── Types ───────────────────────────────────────────────────────────────────

type Deployment = NonNullable<Awaited<ReturnType<typeof getDeploymentByIdAction>>>;
type ComponentSuccess = Deployment['componentSuccesses'][number];
type ComponentFailure = Deployment['componentFailures'][number];
type TestSuccess = Deployment['testSuccesses'][number];
type TestFailure = Deployment['testFailures'][number];
type Organization = Awaited<ReturnType<typeof getOrganizationById>>;
type CodeCoverage = Deployment['codeCoverages'][number];

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
                    {deployment.deployUrl && <ExternalLinkButton href={deployment.deployUrl} />}

                    <DestroyDeploymentButton deploymentId={deployment.id} organizationId={deployment.organizationId} />
                </div>
            </div>

            <OverviewCard deployment={deployment} organization={organization} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
                <ComponentsCard deployment={deployment} />
                <TestsCard deployment={deployment} />
            </div>

            <CodeCoverageCard deployment={deployment} />

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

            {deployment.codeCoverages.length > 0 && (
                <section className="flex flex-col gap-2">
                    <SectionHeading icon={<Activity className="size-4 text-blue-500" />} title="Code Coverage" count={deployment.codeCoverages.length} />
                    <CodeCoverageTable rows={deployment.codeCoverages} />
                </section>
            )}
        </div>
    );
}

// ─── Cards ──────────────────────────────────────────────────────────────────

function OverviewCard({ deployment, organization }: { deployment: Deployment; organization: Organization }) {
    return (
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
                    <InfoRow icon={<Clock className="size-3.5" />} label="Start Date" value={new Date(deployment.startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })} />
                    <InfoRow icon={<Calendar className="size-3.5" />} label="End Date" value={new Date(deployment.endDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })} />
                    <InfoRow icon={<Timer className="size-3.5" />} label="Duration" value={formatDuration(deployment.deploymentDuration)} />
                </div>
            </CardContent>
        </Card>
    );
}

function ComponentsCard({ deployment }: { deployment: Deployment }) {
    return (
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Boxes className="size-4 text-muted-foreground" />Components <span className="text-muted-foreground font-normal text-sm">({deployment.numberComponentsTotal})</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
                <InfoRow label="Deployed" value={<span className="font-medium text-green-600 dark:text-green-400">{deployment.numberComponentsDeployed} <span className="font-normal text-muted-foreground">({computePercent(deployment.numberComponentsDeployed, deployment.numberComponentsTotal)}%)</span></span>} />
                <InfoRow label="Errors" value={deployment.numberComponentErrors > 0 ? <span className="font-medium text-red-600 dark:text-red-400">{deployment.numberComponentErrors} <span className="font-normal text-red-400/70 dark:text-red-500/70">({computePercent(deployment.numberComponentErrors, deployment.numberComponentsTotal)}%)</span></span> : <span>0 <span className="text-muted-foreground">(0%)</span></span>} />
                <Separator className="my-1 opacity-50" />
                <InfoRow label="Deploy Rate" value={<span className={`font-medium ${deployment.componentDeployRate === 100 ? 'text-green-600 dark:text-green-400' : deployment.componentDeployRate >= 75 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>{deployment.componentDeployRate}%</span>} />
                <InfoRow label="Changed" value={<span className="tabular-nums">{deployment.changedComponents}</span>} />
                <InfoRow label="Created" value={<span className="tabular-nums">{deployment.createdComponents}</span>} />
                <InfoRow label="Deleted" value={<span className="tabular-nums">{deployment.deletedComponents}</span>} />
            </CardContent>
        </Card>
    );
}

function TestsCard({ deployment }: { deployment: Deployment }) {
    return (
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FlaskConical className="size-4 text-muted-foreground" />Tests <span className="text-muted-foreground font-normal text-sm">({deployment.numberTestsTotal})</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
                <InfoRow label="Successes" value={<span className="font-medium text-green-600 dark:text-green-400">{deployment.numberTestsCompleted} <span className="font-normal text-muted-foreground">({computePercent(deployment.numberTestsCompleted, deployment.numberTestsTotal)}%)</span></span>} />
                <InfoRow label="Errors" value={deployment.numberTestErrors > 0 ? <span className="font-medium text-red-600 dark:text-red-400">{deployment.numberTestErrors} <span className="font-normal text-red-400/70 dark:text-red-500/70">({computePercent(deployment.numberTestErrors, deployment.numberTestsTotal)}%)</span></span> : <span>0 <span className="text-muted-foreground">(0%)</span></span>} />
                <Separator className="my-1 opacity-50" />
                <InfoRow label="Pass Rate" value={<span className={`font-medium ${deployment.testPassRate === 100 ? 'text-green-600 dark:text-green-400' : deployment.testPassRate >= 75 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>{deployment.testPassRate}%</span>} />
                <InfoRow icon={<Timer className="size-3.5" />} label="Total Time" value={<span className="tabular-nums">{deployment.totalTestExecutionTime.toLocaleString()} ms</span>} />
                <InfoRow icon={<Timer className="size-3.5" />} label="Average Time / Test" value={<span className="tabular-nums">{deployment.averageTestExecutionTime.toLocaleString()} ms</span>} />
            </CardContent>
        </Card>
    );
}

function CodeCoverageCard({ deployment }: { deployment: Deployment }) {
    if (deployment.codeCoverages.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="size-4 text-muted-foreground" />

                        <span>Code Coverage</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-sm">
                    <p className="text-muted-foreground">No code coverage data available for this deployment.</p>
                </CardContent>
            </Card>
        );
    }

    const { codeCoveragePercent, minCodeCoverage, maxCodeCoverage, codeCoverageBelowThresholdPercent } = deployment;
    const coverageColor = computeCoverageColor(codeCoveragePercent);
    const barColor = computeCoverageBarColor(codeCoveragePercent);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="size-4 text-muted-foreground" />
                    <span>Code Coverage</span>
                    <span className="text-muted-foreground font-normal text-sm">({deployment.codeCoverages.length} classes)</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${codeCoveragePercent}%` }} />
                    </div>
                    <span className={`text-base font-semibold tabular-nums ${coverageColor}`}>{codeCoveragePercent}%</span>
                </div>
                <div className="flex flex-col gap-2">
                    {maxCodeCoverage && <InfoRow label="Best class" value={<span className="font-medium text-green-600 dark:text-green-400">{maxCodeCoverage.className} ({maxCodeCoverage.percentage}%)</span>} />}
                    {minCodeCoverage && <InfoRow label="Worst class" value={<span className="font-medium text-red-600 dark:text-red-400">{minCodeCoverage.className} ({minCodeCoverage.percentage}%)</span>} />}
                    <InfoRow label="Classes below 75%" value={<span className={`font-medium ${codeCoverageBelowThresholdPercent > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{codeCoverageBelowThresholdPercent}%</span>} />
                </div>
            </CardContent>
        </Card>
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
                    {rows.map((componentSuccess, index) => (
                        <TableRow key={index}>
                            <TableCell>{componentSuccess.fullName}</TableCell>
                            <TableCell><span className="rounded bg-muted px-1.5 py-0.5 text-xs">{componentSuccess.componentType}</span></TableCell>
                            <TableCell>{componentSuccess.changed ? <CheckCircle2 className="size-4 text-green-500" /> : <span className="text-muted-foreground">—</span>}</TableCell>
                            <TableCell>{componentSuccess.created ? <CheckCircle2 className="size-4 text-blue-500" /> : <span className="text-muted-foreground">—</span>}</TableCell>
                            <TableCell>{componentSuccess.deleted ? <XCircle className="size-4 text-red-500" /> : <span className="text-muted-foreground">—</span>}</TableCell>
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
                    {rows.map((componentFailure, index) => (
                        <TableRow key={index} className="bg-red-50/50 dark:bg-red-950/20">
                            <TableCell>{componentFailure.fullName}</TableCell>
                            <TableCell><span className="rounded bg-muted px-1.5 py-0.5 text-xs">{componentFailure.componentType}</span></TableCell>
                            <TableCell className="max-w-xs truncate text-red-700 dark:text-red-400">{componentFailure.problem}</TableCell>
                            <TableCell><span className="rounded bg-red-100 dark:bg-red-900/40 px-1.5 py-0.5 text-xs text-red-700 dark:text-red-400">{componentFailure.problemType}</span></TableCell>
                            <TableCell className="text-muted-foreground">{componentFailure.lineNumber}</TableCell>
                            <TableCell className="text-muted-foreground">{componentFailure.columnNumber}</TableCell>
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
                    {rows.map((testSuccess) => (
                        <TableRow key={testSuccess.id}>
                            <TableCell>{testSuccess.className}</TableCell>
                            <TableCell>{testSuccess.methodName}</TableCell>
                            <TableCell className="text-muted-foreground">{testSuccess.namespace ?? '—'}</TableCell>
                            <TableCell>{testSuccess.time}</TableCell>
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
                    {rows.map((testFailure) => (
                        <TableRow key={testFailure.id} className="bg-red-50/50 dark:bg-red-950/20">
                            <TableCell>{testFailure.className}</TableCell>
                            <TableCell>{testFailure.methodName}</TableCell>
                            <TableCell className="text-muted-foreground">{testFailure.namespace ?? '—'}</TableCell>
                            <TableCell className="max-w-xs truncate text-red-700 dark:text-red-400">{testFailure.message}</TableCell>
                            <TableCell className="text-muted-foreground">{testFailure.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function CodeCoverageTable({ rows }: { rows: CodeCoverage[] }) {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Covered Lines</TableHead>
                        <TableHead>Uncovered Lines</TableHead>
                        <TableHead>Total Lines</TableHead>
                        <TableHead>Coverage</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((coverage, index) => {
                        const coveredLines = coverage.numLocations - coverage.numLocationsNotCovered;
                        const coveragePercent = coverage.numLocations > 0 ? Math.round((coveredLines / coverage.numLocations) * 100) : 0;
                        const coverageColor = computeCoverageColor(coveragePercent);
                        return (
                            <TableRow key={index}>
                                <TableCell>{coverage.className}</TableCell>
                                <TableCell className="text-green-600 dark:text-green-400">{coveredLines}</TableCell>
                                <TableCell className={coverage.numLocationsNotCovered > 0 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}>{coverage.numLocationsNotCovered}</TableCell>
                                <TableCell className="text-muted-foreground">{coverage.numLocations}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${computeCoverageBarColor(coveragePercent)}`}
                                                style={{ width: `${coveragePercent}%` }}
                                            />
                                        </div>
                                        <span className={`text-sm font-medium ${coverageColor}`}>{coveragePercent}%</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computePercent(value: number, total: number) {
    return total > 0 ? Math.round(value / total * 100) : 0;
}

function formatDuration(duration: { hours: number; minutes: number; seconds: number }) {
    return Temporal.Duration.from(duration).toLocaleString('en-US', { style: 'long' });
}

function computeCoverageColor(percent: number) {
    if (percent >= 75) return 'text-green-600 dark:text-green-400';
    if (percent >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
}

function computeCoverageBarColor(percent: number) {
    if (percent >= 75) return 'bg-green-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
}

// ─── Primitives ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'succeeded') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle2 className="size-3" />
                {status}
            </span>
        );
    }
    if (normalizedStatus === 'failed') {
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

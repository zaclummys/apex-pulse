import { Temporal } from '@js-temporal/polyfill';
import { CheckCircle2, Gauge, Package, Timer, TrendingUp, XCircle } from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type OrganizationMetricsSectionProps = {
    deploymentSuccessRate: number;
    successfulDeployments: number;
    failedDeployments: number;
    averageDeploymentTimeMs: number;
    averageDeploymentSize: number;
};

export default function OrganizationMetricsSection ({ deploymentSuccessRate, successfulDeployments, failedDeployments, averageDeploymentTimeMs, averageDeploymentSize }: OrganizationMetricsSectionProps) {
    const successRateColor = computeSuccessRateColor(deploymentSuccessRate);
    const barColor = computeBarColor(deploymentSuccessRate);

    return (
        <section className="flex flex-col gap-3">
            <span className="flex items-center gap-2 font-medium">
                <TrendingUp className="size-4 text-muted-foreground" />
                Metrics
            </span>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Gauge className="size-4 text-muted-foreground" />
                            Deployment Success Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${barColor}`}
                                    style={{ width: `${deploymentSuccessRate}%` }}
                                />
                            </div>
                            <span className={`text-base font-semibold tabular-nums ${successRateColor}`}>
                                {deploymentSuccessRate}%
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                    <CheckCircle2 className="size-3.5 text-green-500" />
                                    Successful
                                </span>
                                <span className="tabular-nums font-medium">{successfulDeployments}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                    <XCircle className="size-3.5 text-red-500" />
                                    Failed
                                </span>
                                <span className="tabular-nums font-medium">{failedDeployments}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Timer className="size-4 text-muted-foreground" />
                            Average Deployment Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 items-center justify-center">
                        {averageDeploymentTimeMs === 0 ? (
                            <span className="text-sm text-muted-foreground">No data</span>
                        ) : (
                            <span className="text-2xl font-semibold tabular-nums text-center">{formatDuration(averageDeploymentTimeMs)}</span>
                        )}
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Package className="size-4 text-muted-foreground" />
                            Avg Deployment Size
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 items-center justify-center">
                        {averageDeploymentSize === 0 ? (
                            <span className="text-sm text-muted-foreground">No data</span>
                        ) : (
                            <span className="text-2xl font-semibold tabular-nums">
                                {averageDeploymentSize} components
                            </span>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

function formatDuration (ms: number): string {
    const duration = Temporal.Duration.from({ milliseconds: ms }).round({
        largestUnit: 'hours',
        smallestUnit: 'seconds',
    });

    return duration.toLocaleString('en-US', { style: 'long' });
}

function computeSuccessRateColor (rate: number): string {
    if (rate >= 75) return 'text-green-600 dark:text-green-400';
    if (rate >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
}

function computeBarColor (rate: number): string {
    if (rate >= 75) return 'bg-green-500';
    if (rate >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
}

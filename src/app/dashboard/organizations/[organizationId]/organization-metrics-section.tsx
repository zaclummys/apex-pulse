import { Activity, CheckCircle2, TrendingUp, XCircle } from 'lucide-react';

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
};

export default function OrganizationMetricsSection ({ deploymentSuccessRate, successfulDeployments, failedDeployments }: OrganizationMetricsSectionProps) {
    const successRateColor =
        deploymentSuccessRate >= 75
            ? 'text-green-600 dark:text-green-400'
            : deploymentSuccessRate >= 50
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-red-600 dark:text-red-400';

    const barColor =
        deploymentSuccessRate >= 75
            ? 'bg-green-500'
            : deploymentSuccessRate >= 50
                ? 'bg-yellow-500'
                : 'bg-red-500';

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
                            <Activity className="size-4 text-muted-foreground" />
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
            </div>
        </section>
    );
}

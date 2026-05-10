import { DeploymentIcon } from '@/components/icons';
import { getDeploymentById, getOrganizationById } from '@/core';

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import DeploymentRowUI from './deployment-row-ui';

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
        <DeploymentRowUI
            deployment={deployment}
            organization={organization ?? undefined}
        />
    );
}


'use client';

import { Button } from '@/components/ui/button';
import destroyDeploymentAction from '@/actions/commands/destroy-deployment';

export default function DestroyDeploymentButton ({ deploymentId, organizationId }: { deploymentId: string; organizationId: string }) {
    async function handleDestroy () {
        if (!confirm('Are you sure you want to destroy this deployment? This action cannot be undone.')) {
            return;
        }

        await destroyDeploymentAction(deploymentId, organizationId);
    }

    return (
        <Button variant="destructive" onClick={handleDestroy}>
            Destroy Deployment
        </Button>
    );
}

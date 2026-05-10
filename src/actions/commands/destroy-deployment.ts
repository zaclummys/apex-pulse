'use server';

import { destroyDeployment } from '@/core';
import { redirect } from 'next/navigation';

export default async function destroyDeploymentAction (deploymentId: string, organizationId: string): Promise<void> {
    await destroyDeployment({ id: deploymentId });

    redirect(`/dashboard/organizations/${organizationId}`);
}

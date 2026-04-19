import Link from 'next/link';

import { getOrganizationsByUserId, getDeploymentsByOrganizationId } from '@/core';
import getCurrentUserId from '@/app/actions/queries/get-current-user-id';

export default async function DeploymentsPage () {
    const currentUserId = await getCurrentUserId();
    const organizations = await getOrganizationsByUserId(currentUserId);

    const deploymentsByOrg = await Promise.all(
        organizations.map(async (organization) => {
            const deployments = await getDeploymentsByOrganizationId(organization.id);

            return deployments.map(deployment => ({
                ...deployment,
                organization,
            }));
        })
    );

    const deployments = deploymentsByOrg.flat();

    return (
        <div>
            <h1>Deployments</h1>

            {deployments.length === 0 ? (
                <p>No deployments yet.</p>
            ) : (
                <ul>
                    {deployments.map(deployment => (
                        <li key={deployment.id}>
                            <Link href={`/dashboard/deployments/${deployment.id}`}>
                                <span>{deployment.status}</span>
                                {' — '}
                                <span>{deployment.organization.name}</span>
                                {' — '}
                                <span>{deployment.createdByName}</span>
                                {' — '}
                                <span>{new Date(deployment.startDate).toLocaleDateString()}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

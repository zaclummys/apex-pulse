import Link from 'next/link';

import {
    getOrganizationById,
    getDeploymentsByOrganizationId,
} from '@/core';

import CreateDeploymentModal from './create-deployment-modal';

export default async function OrganizationPage ({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        return <div>Organization not found</div>;
    }

    const deployments = await getDeploymentsByOrganizationId(organizationId);

    return (
        <div>
            <h1>{organization.name}</h1>

            <CreateDeploymentModal organizationId={organizationId} />

            <h2>Deployments</h2>

            {deployments.length === 0 ? (
                <p>No deployments yet.</p>
            ) : (
                <ul>
                    {deployments.map(deployment => (
                        <li key={deployment.id}>
                            <Link href={`/dashboard/deployments/${deployment.id}`}>
                                <span>{deployment.status}</span>
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

import { notFound } from 'next/navigation';
import { Building2 } from 'lucide-react';
import ExternalLinkButton from '@/components/external-link-button';

import { getOrganizationById } from '@/core';

import DestroyOrganizationButton from './destroy-organization-button';
import DeploymentsSection from './deployments-section';
import ApiKeysSection from './api-keys-section';
import OrganizationMetricsSection from './organization-metrics-section';

export default async function OrganizationPage ({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Building2 className="size-6 text-muted-foreground" />
                    <span className="text-xl font-semibold">{organization.name}</span>
                </div>

                <div className="flex items-center gap-2">
                    {organization.url && <ExternalLinkButton href={organization.url} />}
                    <DestroyOrganizationButton organizationId={organizationId} />
                </div>
            </div>

            <OrganizationMetricsSection
                deploymentSuccessRate={organization.deploymentSuccessRate}
                successfulDeployments={organization.successfulDeployments}
                failedDeployments={organization.failedDeployments}
                averageDeploymentTimeMs={organization.averageDeploymentTimeMs}
            />
            <DeploymentsSection organizationId={organizationId} />
            <ApiKeysSection organizationId={organizationId} />
        </div>
    );
}
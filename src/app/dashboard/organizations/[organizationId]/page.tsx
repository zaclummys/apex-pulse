import { notFound } from 'next/navigation';
import { Building2, Rocket } from 'lucide-react';
import ExternalLinkButton from '@/components/external-link-button';

import { getOrganizationById, getDeploymentsByOrganizationId } from '@/core';

import CreateDeploymentModal from './create-deployment-modal';
import CreateApiKeyModal from './create-api-key-modal';
import DestroyOrganizationButton from './destroy-organization-button';
import DeploymentTable from '@/app/dashboard/deployment-table';

export default async function OrganizationPage ({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        notFound();
    }

    const deploymentIds = await getDeploymentsByOrganizationId(organizationId);

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
                    <CreateApiKeyModal organizationId={organizationId} />
                    <CreateDeploymentModal organizationId={organizationId} />
                    <DestroyOrganizationButton organizationId={organizationId} />
                </div>
            </div>

            {/* Deployments */}
            <section className="flex flex-col gap-3">
                <span className="flex items-center gap-2 font-medium">
                    <Rocket className="size-4 text-muted-foreground" />
                    Deployments
                    <span className="text-muted-foreground font-normal">({deploymentIds.length})</span>
                </span>

                <DeploymentTable deploymentIds={deploymentIds} showOrganization={false} />
            </section>
        </div>
    );
}




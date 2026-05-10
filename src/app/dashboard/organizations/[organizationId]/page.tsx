import { notFound } from 'next/navigation';
import { Building2, KeyRound, Rocket } from 'lucide-react';
import ExternalLinkButton from '@/components/external-link-button';

import { getOrganizationById, getDeploymentsByOrganizationId, getApiKeysByOrganizationId } from '@/core';

import CreateDeploymentModal from './create-deployment-modal';
import CreateApiKeyModal from './create-api-key-modal';
import DestroyOrganizationButton from './destroy-organization-button';
import DestroyApiKeyButton from './destroy-api-key-button';
import DeploymentTable from '@/app/dashboard/deployment-table';

export default async function OrganizationPage ({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        notFound();
    }

    const deploymentIds = await getDeploymentsByOrganizationId(organizationId);
    const apiKeys = await getApiKeysByOrganizationId(organizationId);

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

            {/* API Keys */}
            <section className="flex flex-col gap-3">
                <span className="flex items-center gap-2 font-medium">
                    <KeyRound className="size-4 text-muted-foreground" />
                    API Keys
                    <span className="text-muted-foreground font-normal">({apiKeys.length})</span>
                </span>

                {apiKeys.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-10 text-center">
                        <KeyRound className="size-8 text-muted-foreground/50" />
                        <p className="text-sm font-medium">No API keys yet</p>
                        <p className="text-xs text-muted-foreground">Create an API key to authenticate requests to this organization.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {apiKeys.map((apiKey) => (
                            <div key={apiKey.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium">{apiKey.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        Created {new Date(apiKey.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <DestroyApiKeyButton apiKeyId={apiKey.id} organizationId={organizationId} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}




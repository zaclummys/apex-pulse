import { ApiKeyIcon } from '@/components/icons';

import { getApiKeysByOrganizationId } from '@/core';

import CreateApiKeyModal from './create-api-key-modal';
import DestroyApiKeyButton from './destroy-api-key-button';

export default async function ApiKeysSection ({ organizationId }: { organizationId: string }) {
    const apiKeys = await getApiKeysByOrganizationId(organizationId);

    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                    <ApiKeyIcon className="size-4 text-muted-foreground" />
                    API Keys
                    <span className="text-muted-foreground font-normal">({apiKeys.length})</span>
                </span>
                <CreateApiKeyModal organizationId={organizationId} />
            </div>

            {apiKeys.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-10 text-center">
                    <ApiKeyIcon className="size-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium">No API keys yet</p>
                    <p className="text-xs text-muted-foreground">Create an API key to authenticate requests to this organization.</p>
                </div>
            ) : (
                <div className="rounded-lg border divide-y">
                    {apiKeys.map((apiKey) => (
                        <div key={apiKey.id} className="flex items-center justify-between px-4 py-3 first:rounded-t-lg last:rounded-b-lg">
                            <div className="flex flex-col">
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
    );
}

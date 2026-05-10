'use client';

import { DeleteIcon } from '@/components/icons';

import { Button } from '@/components/ui/button';
import destroyApiKeyAction from '@/actions/commands/destroy-api-key';

export default function DestroyApiKeyButton ({ apiKeyId, organizationId }: { apiKeyId: string; organizationId: string }) {
    async function handleDestroy () {
        if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
            return;
        }

        await destroyApiKeyAction(apiKeyId, organizationId);
    }

    return (
        <Button variant="ghost" size="sm" onClick={handleDestroy} className="text-destructive hover:text-destructive">
            <DeleteIcon className="size-4" />
        </Button>
    );
}

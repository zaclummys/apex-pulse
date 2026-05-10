'use client';

import { Button } from '@/components/ui/button';
import destroyOrganizationAction from '@/actions/commands/destroy-organization';

export default function DestroyOrganizationButton ({ organizationId }: { organizationId: string }) {
    async function handleDestroy () {
        if (!confirm('Are you sure you want to destroy this organization? This action cannot be undone.')) {
            return;
        }

        await destroyOrganizationAction(organizationId);
    }

    return (
        <Button variant="destructive" onClick={handleDestroy}>
            Destroy Organization
        </Button>
    );
}

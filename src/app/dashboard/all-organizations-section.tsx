import getAllOrganizationsAction from '@/actions/queries/get-all-organizations';
import { Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import CreateOrganizationModal from './create-organization-modal';

export default function AllOrganizationsSection () {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span>All Organizations</span>

                <CreateOrganizationModal />
            </div>

            <AllOrganizationsGrid />
        </div>
    );
}

async function AllOrganizationsGrid () {
    const organizations = await getAllOrganizationsAction();

    if (organizations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center">
                <Building2 className="size-10 text-muted-foreground/50" />
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">No organizations yet</span>
                    <span className="text-xs text-muted-foreground">Create your first organization to get started.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-3">
            {organizations.map((organization) => (
                <OrganizationCard
                    key={organization.id}
                    organization={organization}
                />
            ))}
        </div>
    );
}

function getInitial (name: string) {
    return name[0].toUpperCase();
}

function OrganizationCard ({ organization }: { organization: { id: string; name: string; url: string } }) {
    const initial = getInitial(organization.name);
    const displayUrl = organization.url.replace(/^https?:\/\//, '');

    return (
        <Link href={`/dashboard/organizations/${organization.id}`}>
            <div className="group flex items-center gap-4 rounded-xl border bg-card px-4 py-4 ring-1 ring-foreground/10 transition-colors hover:bg-muted cursor-pointer">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {initial}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium">{organization.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{displayUrl}</span>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
        </Link>
    );
}
import getAllOrganizationsAction from '@/actions/queries/get-all-organizations';
import {
    Card,
    CardTitle,
    CardHeader,
} from '@/components/ui/card';
import { Building2 } from 'lucide-react';
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
        <div className="grid grid-cols-3 gap-2">
            {organizations.map((organization) => (
                <OrganizationCard
                    key={organization.name}
                    organization={organization}
                />
            ))}
        </div>
    );
}

function OrganizationCard ({ organization }: { organization: { id: string, name: string } }) {
    return (
        <Link href={`/dashboard/organizations/${organization.id}`}>
            <Card
                key={organization.name}
                className="cursor-pointer hover:bg-muted transition-colors">
                <CardHeader>
                    <CardTitle>{organization.name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}
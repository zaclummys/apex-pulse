import getAllOrganizationsAction from '@/actions/queries/get-all-organizations';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardTitle,
    CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';

export default function AllOrganizationsSection () {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span>All Organizations</span>

                <Button variant="outline" size="sm">
                    Create organization
                </Button>
            </div>

            <AllOrganizationsGrid />
        </div>
    );
}

async function AllOrganizationsGrid () {
    const organizations = await getAllOrganizationsAction();

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
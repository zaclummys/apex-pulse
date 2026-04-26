import AllOrganizationsSection from './all-organizations-section';
import LatestDeploymentsSection from './latest-deployments-section';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <AllOrganizationsSection />
            <LatestDeploymentsSection />
        </div>
    );
}
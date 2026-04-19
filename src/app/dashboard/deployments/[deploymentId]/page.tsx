import { getDeploymentById } from '@/core';

export default async function DeploymentPage ({ params }: { params: Promise<{ deploymentId: string }> }) {
    const { deploymentId } = await params;

    const deployment = await getDeploymentById(deploymentId);

    if (!deployment) {
        return <div>Deployment not found</div>;
    }

    return (
        <div>
            <h1>Deployment — {deployment.status}</h1>

            <div>
                <p>Created by: {deployment.createdByName}</p>
                <p>Start: {new Date(deployment.startDate).toLocaleString()}</p>
                <p>End: {new Date(deployment.endDate).toLocaleString()}</p>
                <p>Check only: {deployment.checkOnly ? 'Yes' : 'No'}</p>
            </div>

            <h2>Components ({deployment.numberComponentsDeployed}/{deployment.numberComponentsTotal})</h2>

            {deployment.componentFailures.length > 0 && (
                <>
                    <h3>Failures ({deployment.numberComponentErrors})</h3>
                    <ul>
                        {deployment.componentFailures.map((failure, index) => (
                            <li key={index}>
                                <strong>{failure.componentType}: {failure.fullName}</strong>
                                {' — '}
                                Line {failure.lineNumber}, Column {failure.columnNumber}
                                {' — '}
                                {failure.problem}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {deployment.componentSuccesses.length > 0 && (
                <>
                    <h3>Successes</h3>
                    <ul>
                        {deployment.componentSuccesses.map((success, index) => (
                            <li key={index}>
                                {success.componentType}: {success.fullName}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <h2>Tests ({deployment.numberTestsCompleted}/{deployment.numberTestsTotal})</h2>

            {deployment.testFailures.length > 0 && (
                <>
                    <h3>Failures ({deployment.numberTestErrors})</h3>
                    <ul>
                        {deployment.testFailures.map((failure, index) => (
                            <li key={index}>
                                <strong>{failure.className}.{failure.methodName}</strong>
                                {' — '}
                                {failure.message}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {deployment.testSuccesses.length > 0 && (
                <>
                    <h3>Successes</h3>
                    <ul>
                        {deployment.testSuccesses.map((success, index) => (
                            <li key={index}>
                                {success.className}.{success.methodName}
                                {' — '}
                                {success.time}ms
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

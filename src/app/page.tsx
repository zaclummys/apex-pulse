import Header from '@/app/header';
import {
    AppIcon,
    DeploymentIcon,
    TestsIcon,
    OrganizationIcon,
    CodeCoverageIcon,
    DeploymentSuccessRateIcon,
    ApiKeyIcon,
    SuccessIcon,
} from '@/components/icons';
import ButtonLink from '@/components/button-link';

const FEATURES = [
    {
        icon: DeploymentIcon,
        title: 'Deployment Tracking',
        description: 'Monitor every Salesforce deployment in real time — from start to finish, with full status history.',
    },
    {
        icon: TestsIcon,
        title: 'Test Results Analysis',
        description: 'Dive into Apex test outcomes, failures, and error messages without leaving your dashboard.',
    },
    {
        icon: OrganizationIcon,
        title: 'Multi-Org Management',
        description: 'Manage multiple Salesforce orgs side by side. Switch context instantly, no extra tooling needed.',
    },
    {
        icon: CodeCoverageIcon,
        title: 'Code Coverage Insights',
        description: 'Track code coverage trends across deployments and catch regressions before they reach production.',
    },
    {
        icon: DeploymentSuccessRateIcon,
        title: 'Success Rate Metrics',
        description: 'Visualize your team\'s deployment success rate over time and identify patterns at a glance.',
    },
    {
        icon: ApiKeyIcon,
        title: 'API Key Access',
        description: 'Generate and manage API keys to integrate Apex Pulse into your CI/CD pipelines seamlessly.',
    },
];

export default function Home () {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero */}
            <section className="flex-1 flex flex-col items-center text-center gap-8 px-4 py-24 md:py-36 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,oklch(0.9_0_0/40%),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,oklch(0.3_0_0/60%),transparent)]" />

                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                    <SuccessIcon className="w-3.5 h-3.5 text-primary" />
                    Built for Salesforce teams
                </div>

                <h1 className="max-w-3xl text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                    Monitor every Salesforce deployment,{' '}
                    <span className="text-muted-foreground">in one place.</span>
                </h1>

                <p className="max-w-xl text-lg text-muted-foreground">
                    Track deployments, analyze test results, measure code coverage,
                    and manage multiple orgs — without juggling tabs or CLI output.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    <ButtonLink href="/sign-up">
                        Get started for free
                    </ButtonLink>
                    <ButtonLink href="/#features" variant="outline">
                        See what&apos;s included
                    </ButtonLink>
                </div>

            </section>

            {/* Features */}
            <section id="features" className="px-4 py-24 flex flex-col items-center gap-14 bg-muted/40">
                <div className="text-center flex flex-col gap-3 max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Everything your team needs
                    </h2>
                    <p className="text-muted-foreground">
                        From live deployment status to long-term metrics, Apex Pulse surfaces
                        the insights that keep your releases on track.
                    </p>
                </div>

                <div className="w-full max-w-5xl grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="font-semibold text-foreground">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CLI Integration */}
            <section className="px-4 py-24 flex flex-col items-center gap-14">
                <div className="text-center flex flex-col gap-3 max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Works right from your terminal
                    </h2>
                    <p className="text-muted-foreground">
                        Deploy with the SF CLI and pipe the result straight to Apex Pulse — no extra tooling, no manual uploads.
                    </p>
                </div>

                <div className="w-full max-w-4xl rounded-xl border border-border bg-[oklch(0.13_0_0)] overflow-hidden text-sm font-mono">
                    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/50">
                        <span className="w-3 h-3 rounded-full bg-red-500/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>

                    <div className="p-6 flex flex-col gap-3 text-[oklch(0.85_0_0)] leading-relaxed">
                        <div>
                            <span className="text-[oklch(0.55_0_0)] select-none"># 1. Deploy and capture the result</span>
                        </div>
                        <div>
                            <span className="text-[oklch(0.65_0.18_145)]">$</span>
                            {' '}sf project deploy start{' '}
                            <span className="text-[oklch(0.75_0.15_250)]">--json</span>
                            {' '}&gt; deploy-result.json
                        </div>

                        <div className="mt-2">
                            <span className="text-[oklch(0.55_0_0)] select-none"># 2. Push it to Apex Pulse</span>
                        </div>
                        <div>
                            <span className="text-[oklch(0.65_0.18_145)]">$</span>
                            {' '}curl{' '}
                            <span className="text-[oklch(0.75_0.15_250)]">-X POST</span>
                            {' '}https://apex-pulse.com/api/organizations/
                            <span className="text-[oklch(0.75_0.18_55)]">{'<your-organization-id>'}</span>
                            /deployments \
                        </div>
                        <div className="pl-5">
                            <span className="text-[oklch(0.75_0.15_250)]">-H</span>
                            {' '}<span className="text-[oklch(0.72_0.15_30)]">&quot;Content-Type: application/json&quot;</span>
                            {' '}\
                        </div>
                        <div className="pl-5">
                            <span className="text-[oklch(0.75_0.15_250)]">-H</span>
                            {' '}<span className="text-[oklch(0.72_0.15_30)]">&quot;X-Api-Key: </span><span className="text-[oklch(0.75_0.18_55)]">{'<your-api-key>'}</span><span className="text-[oklch(0.72_0.15_30)]">&quot;</span>
                            {' '}\
                        </div>
                        <div className="pl-5">
                            <span className="text-[oklch(0.75_0.15_250)]">-d</span>
                            {' '}<span className="text-[oklch(0.72_0.15_30)]">@deploy-result.json</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 py-24 flex flex-col items-center text-center gap-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-xl">
                    Ready to take control of your deployments?
                </h2>
                <p className="text-muted-foreground max-w-md">
                    Create your account and start monitoring Salesforce deployments today.
                    No credit card required.
                </p>
                <ButtonLink href="/sign-up" size="lg">
                    Create your free account
                </ButtonLink>
            </section>

            {/* Footer */}
            <footer className="border-t border-border px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-foreground">
                    <AppIcon className="w-4 h-4" />
                    Apex Pulse
                </div>
                <span>&copy; 2026 Apex Pulse. All rights reserved.</span>
            </footer>
        </div>
    );
}

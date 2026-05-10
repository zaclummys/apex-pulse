# Metrics

## Questions

- How successful are our deployments?
- How long do deployments take?
- How long do tests take to run?
- How good is our test coverage?
- How many components are created or changed per deploy?
- How often do our tests fail?
- How large are our deployments?
- How often do we have flaky tests?
- How often do we have failed deployments due to test failures?
- How often do we have failed deployments due to other reasons (e.g. validation errors, timeouts, etc.)?
- How do these metrics change over time?
- How do these metrics vary by team, component, or other dimensions?
- How fast do we fix failures?
- Are our tests meaningful?
- What kinds of changes fail most?
- What components are most frequently changed?
- What components most frequently cause failures?


## List

### Deployment-Level
> Computed from a single deployment record and its related test/component data.

- Deployment Duration (Completed Date - Start Date)
- Failure Rate By Failure Type
- Test Execution Time (Run Test Result Total Time)
- Test Execution Time Per Test (totalTime / numTestsRun)
- Coverage Per Class (1 - (numLocationsNotCovered / numLocations))
- Minimum Coverage (Worst Class)
- Maximum Coverage (Best Class)
- % classes below 75% coverage
- Test pass rate (numTestsRun - numFailures) / numTestsRun
- Changed components per deploy
- New components vs modified

### Organization-Level
> Aggregated across all deployments in an organization over time.

- Deployment Success Rate
- Average Deployment Time
- P95 Deployment Time
- Deployment size trend
- Flaky test detection (Same test sometimes in successes, sometimes in failures)
- Mean Time To Recovery (MTTR) between failed deploy → next successful deploy
- Correlation between code coverage and deployment success
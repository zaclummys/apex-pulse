-- CreateTable
CREATE TABLE "DeployCodeCoverage" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "numLocations" INTEGER NOT NULL,
    "numLocationsNotCovered" INTEGER NOT NULL,
    "deploymentId" TEXT NOT NULL,

    CONSTRAINT "DeployCodeCoverage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeployCodeCoverage" ADD CONSTRAINT "DeployCodeCoverage_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

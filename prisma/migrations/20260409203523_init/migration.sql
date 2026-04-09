-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "salesforceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deployment" (
    "id" TEXT NOT NULL,
    "salesforceId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdByName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "numberTestsCompleted" INTEGER NOT NULL,
    "numberTestsTotal" INTEGER NOT NULL,
    "numberTestErrors" INTEGER NOT NULL,
    "numberComponentsDeployed" INTEGER NOT NULL,
    "numberComponentsTotal" INTEGER NOT NULL,
    "numberComponentErrors" INTEGER NOT NULL,
    "checkOnly" BOOLEAN NOT NULL,
    "deployUrl" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Deployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeployComponentSuccess" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "changed" BOOLEAN NOT NULL,
    "created" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "deploymentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DeployComponentFailure" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "changed" BOOLEAN NOT NULL,
    "created" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "columnNumber" INTEGER NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    "problem" TEXT NOT NULL,
    "problemType" TEXT NOT NULL,
    "deploymentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DeployTestSuccess" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "methodName" TEXT NOT NULL,
    "namespace" TEXT,
    "time" INTEGER NOT NULL,
    "deploymentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DeployTestFailure" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "methodName" TEXT NOT NULL,
    "namespace" TEXT,
    "message" TEXT NOT NULL,
    "stackTrace" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "deploymentId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_salesforceId_key" ON "Organization"("salesforceId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "DeployComponentSuccess_id_key" ON "DeployComponentSuccess"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeployComponentFailure_id_key" ON "DeployComponentFailure"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeployTestSuccess_id_key" ON "DeployTestSuccess"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeployTestFailure_id_key" ON "DeployTestFailure"("id");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deployment" ADD CONSTRAINT "Deployment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeployComponentSuccess" ADD CONSTRAINT "DeployComponentSuccess_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeployComponentFailure" ADD CONSTRAINT "DeployComponentFailure_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeployTestSuccess" ADD CONSTRAINT "DeployTestSuccess_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeployTestFailure" ADD CONSTRAINT "DeployTestFailure_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

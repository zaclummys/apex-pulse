import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';
import PrismaApiKeyRepository from '@/core/infra/prisma/api-key-repository';
import PrismaUserRepository from '@/core/infra/prisma/user-repository';
import PrismaSessionRepository from '@/core/infra/prisma/session-repository';

import { GetOrganizationByIdService } from '@/core/application/queries/get-organization-by-id';
import { GetOrganizationsByUserIdService } from '@/core/application/queries/get-organizations-by-user-id';
import { GetDeploymentByIdService } from '@/core/application/queries/get-deployment-by-id';
import { GetDeploymentsByOrganizationIdService } from '@/core/application/queries/get-deployments-by-organization-id';
import { GetLatestDeploymentsService } from '@/core/application/queries/get-latest-deployments';
import { GetUserIdByTokenService } from '@/core/application/queries/get-user-id-by-token';
import { GetApiKeysByOrganizationIdService } from '@/core/application/queries/get-api-keys-by-organization-id';

import {
    CreateOrganizationService,
    CreateOrganizationInput,
} from '@/core/application/commands/create-organization';

import {
    DestroyOrganizationService,
    DestroyOrganizationInput,
} from '@/core/application/commands/destroy-organization';

import {
    CreateDeploymentService,
    CreateDeploymentInput,
} from '@/core/application/commands/create-deployment';

import {
    DestroyDeploymentService,
    DestroyDeploymentInput,
} from '@/core/application/commands/destroy-deployment';

import {
    CreateApiKeyService,
    CreateApiKeyInput,
} from '@/core/application/commands/create-api-key';

import {
    DestroyApiKeyService,
    DestroyApiKeyInput,
} from '@/core/application/commands/destroy-api-key';

import {
    SignInService,
    SignInInput,
} from '@/core/application/commands/sign-in';

import {
    SignUpService,
    SignUpInput,
} from '@/core/application/commands/sign-up';

import {
    SignOutService,
    SignOutInput,
} from '@/core/application/commands/sign-out';

const deploymentRepository = new PrismaDeploymentRepository();
const organizationRepository = new PrismaOrganizationRepository();
const apiKeyRepository = new PrismaApiKeyRepository();
const userRepository = new PrismaUserRepository();
const sessionRepository = new PrismaSessionRepository();

export function getOrganizationById (id: string) {
    const getOrganizationByIdService = new GetOrganizationByIdService(organizationRepository, deploymentRepository);

    return getOrganizationByIdService.execute(id);
}

export function getOrganizationsByUserId (userId: string) {
    const getOrganizationsByUserIdService = new GetOrganizationsByUserIdService(organizationRepository);

    return getOrganizationsByUserIdService.execute(userId);
}

export function getDeploymentById (id: string) {
    const getDeploymentByIdService = new GetDeploymentByIdService(deploymentRepository);

    return getDeploymentByIdService.execute(id);
}

export function getDeploymentsByOrganizationId (organizationId: string) {
    const getDeploymentsByOrganizationIdService = new GetDeploymentsByOrganizationIdService(deploymentRepository);

    return getDeploymentsByOrganizationIdService.execute(organizationId);
}

export function getLatestDeployments (userId: string) {
    const getLatestDeploymentsService = new GetLatestDeploymentsService(deploymentRepository);

    return getLatestDeploymentsService.execute(userId);
}

export function createOrganization (createOrganizationInput: CreateOrganizationInput) {
    const createOrganizationService = new CreateOrganizationService(organizationRepository);

    return createOrganizationService.execute(createOrganizationInput);
}

export function destroyOrganization (destroyOrganizationInput: DestroyOrganizationInput) {
    const destroyOrganizationService = new DestroyOrganizationService({
        organizationRepository,
        deploymentRepository,
    });

    return destroyOrganizationService.execute(destroyOrganizationInput);
}

export function createDeployment (createDeploymentInput: CreateDeploymentInput) {
    const createDeploymentService = new CreateDeploymentService({
        deploymentRepository,
        organizationRepository,
    });

    return createDeploymentService.execute(createDeploymentInput);
}

export function destroyDeployment (destroyDeploymentInput: DestroyDeploymentInput) {
    const destroyDeploymentService = new DestroyDeploymentService(deploymentRepository);

    return destroyDeploymentService.execute(destroyDeploymentInput);
}

export function createApiKey (createApiKeyInput: CreateApiKeyInput) {
    const createApiKeyService = new CreateApiKeyService({
        organizationRepository,
        apiKeyRepository,
    });

    return createApiKeyService.execute(createApiKeyInput);
}

export function getApiKeysByOrganizationId (organizationId: string) {
    const getApiKeysByOrganizationIdService = new GetApiKeysByOrganizationIdService(apiKeyRepository);

    return getApiKeysByOrganizationIdService.execute(organizationId);
}

export function destroyApiKey (destroyApiKeyInput: DestroyApiKeyInput) {
    const destroyApiKeyService = new DestroyApiKeyService(apiKeyRepository);

    return destroyApiKeyService.execute(destroyApiKeyInput);
}

export function signIn (signInInput: SignInInput) {
    const signInService = new SignInService({
        userRepository,
        sessionRepository,
    });

    return signInService.execute(signInInput);
}

export function signUp (signUpInput: SignUpInput) {
    const signUpService = new SignUpService(userRepository);

    return signUpService.execute(signUpInput);
}

export function getUserIdByToken (token: string) {
    const getUserIdByTokenService = new GetUserIdByTokenService(sessionRepository);

    return getUserIdByTokenService.execute(token);
}

export function signOut (signOutInput: SignOutInput) {
    const signOutService = new SignOutService(sessionRepository);

    return signOutService.execute(signOutInput);
}
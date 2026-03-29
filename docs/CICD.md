# CI/CD Setup

## Current design

- CI runs on every pull request.
- CI runs on every push and pull request.
- CD is kept as a manual workflow until Google Cloud deployment access is ready.
- Deployment target is Google Cloud Run production only.
- Docker images are pushed to Google Artifact Registry.

## Repository variables and secrets

Create these in GitHub repository settings before enabling deployment:

### Repository variable

- `GAR_REPOSITORY`: Your Artifact Registry repository name in `asia-east1`

### Repository secrets

- `GCP_WORKLOAD_IDENTITY_PROVIDER`: Full Workload Identity Provider resource name
- `GCP_SERVICE_ACCOUNT`: Service account email used by GitHub Actions

## Fixed project values in workflow

- Project ID: `ecotech-tw`
- Cloud Run service: `eco-tech-website`
- Cloud Run region: `asia-east1`
- Image name: `eco-tech-website`

## What CI checks today

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `docker build`

## What Level 3 includes

- A minimal Node-based test setup using `node:test` and `tsx`
- One low-risk schema validation test for the contact form
- No browser automation and no external API mocking yet

## OIDC recommendation

The deployment workflow is set up for GitHub OIDC with Google Cloud Workload Identity Federation.

This is preferred over storing a long-lived service account JSON key in GitHub.

## Deployment flow

1. Trigger the deploy workflow manually
2. GitHub Actions authenticates to Google Cloud
3. Docker image is built and pushed to Artifact Registry
4. Cloud Run deploys the new image revision

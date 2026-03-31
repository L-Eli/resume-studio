# CI/CD Setup

## Current design

- CI runs on every push and pull request through GitHub Actions.
- CD runs through GitHub Actions WIF deployment on `main`.
- Deployment target is Google Cloud Run production only.
- Docker images are pushed to Google Artifact Registry.

## GitHub Actions CI

The GitHub Actions CI workflow checks:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `docker build`

## GitHub Actions CD

The deployment workflow lives in `.github/workflows/deploy.yml`.

The deployment defaults are set to:

- Project ID: `ecotech-tw`
- Artifact Registry repository: `eco-tech-website`
- Cloud Run service: `eco-tech-website`
- Cloud Run region: `asia-east1`
- Image name: `eco-tech-website`

## WIF configuration

The workflow uses Google Workload Identity Federation with:

- Workload Identity Provider:
  `projects/211536603435/locations/global/workloadIdentityPools/github-actions-pool/providers/github-oidc-v2`
- Service account:
  `github-actions-deployer@ecotech-tw.iam.gserviceaccount.com`

When a new commit lands on `main`, GitHub Actions will:

1. Authenticate to Google Cloud via WIF
2. Build the Docker image
3. Push the image to Artifact Registry
4. Deploy the image to Cloud Run

## Required IAM

The deployer service account should have:

- `roles/run.admin`
- `roles/artifactregistry.writer`
- `roles/logging.logWriter`

If your Cloud Run service uses a custom runtime service account, also grant the deployer service account permission to act as that runtime service account.

## Legacy note

`cloudbuild.yaml` is not the active deployment path for this project.

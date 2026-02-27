import { Octokit } from 'octokit';
import { env } from '../config/env.js';

export function githubClient() {
  return new Octokit({ auth: env.githubToken });
}

export async function postPrComment({ owner, repo, prNumber, body }) {
  const client = githubClient();
  await client.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body
  });
}

export async function updateReleaseBody({ owner, repo, releaseId, body }) {
  const client = githubClient();
  await client.rest.repos.updateRelease({
    owner,
    repo,
    release_id: releaseId,
    body
  });
}

export function buildDocUpdatePrompt({ diff, changedFiles }) {
  return {
    system: [
      'You are a documentation automation agent.',
      'You must only use the provided diff and file list as your source of truth.',
      'Do not guess features or behavior that are not present in the diff.',
      'Output must be valid Markdown.',
      'If there is insufficient information, output a short Markdown note saying so.'
    ].join('\n'),
    user: [
      'TASK: Generate a concise documentation update section based strictly on the diff.',
      '',
      'REQUIREMENTS:',
      '- Use ONLY facts from DIFF and CHANGED_FILES.',
      '- Do NOT hallucinate.',
      '- Prefer bullet points grouped by area (API, UI, DevOps, Fixes).',
      '- Do NOT include code fences unless necessary.',
      '- Return Markdown only.',
      '',
      'CHANGED_FILES:',
      JSON.stringify(changedFiles ?? [], null, 2),
      '',
      'DIFF:',
      diff || ''
    ].join('\n')
  };
}

export function buildPrSummaryPrompt({ diff, changedFiles, prDescription }) {
  return {
    system: [
      'You are a pull request summarization agent.',
      'You must only use the provided diff, file list, and PR description.',
      'Do not invent motivations, tickets, or features.',
      'Output must be valid Markdown.'
    ].join('\n'),
    user: [
      'TASK: Produce a structured PR summary strictly from inputs.',
      '',
      'OUTPUT FORMAT (Markdown):',
      '## Summary',
      '- ...',
      '## Key Changes',
      '- ...',
      '## Risks / Notes',
      '- ...',
      '',
      'PR_DESCRIPTION:',
      prDescription || '(none)',
      '',
      'CHANGED_FILES:',
      JSON.stringify(changedFiles ?? [], null, 2),
      '',
      'DIFF:',
      diff || ''
    ].join('\n')
  };
}

export function buildReleaseNotesPrompt({ commitMessages, releaseNotes }) {
  return {
    system: [
      'You are a release notes generation agent.',
      'You must only use the provided commit messages and existing release notes text.',
      'Do not add items not supported by commits.',
      'Output must be valid Markdown.'
    ].join('\n'),
    user: [
      'TASK: Generate categorized release notes strictly from the commit history.',
      '',
      'OUTPUT FORMAT (Markdown):',
      '## Added',
      '- ...',
      '## Changed',
      '- ...',
      '## Fixed',
      '- ...',
      '## Security',
      '- ...',
      '',
      'EXISTING_RELEASE_BODY (may be empty):',
      releaseNotes || '(none)',
      '',
      'COMMIT_MESSAGES:',
      JSON.stringify(commitMessages ?? [], null, 2)
    ].join('\n')
  };
}

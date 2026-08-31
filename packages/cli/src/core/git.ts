import { simpleGit, type SimpleGit } from 'simple-git';
import { execFile, execSync } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export function getGit(cwd: string = process.cwd()): SimpleGit {
  return simpleGit(cwd);
}

export interface LoreLiteCommitOptions {
  message: string;
  description?: string;
  constraint?: string;
  rejected?: string;
  evidence?: string;
}

export function formatLoreLiteCommit(options: LoreLiteCommitOptions): string {
  const parts: string[] = [options.message.trim()];

  if (options.description?.trim()) {
    parts.push(`\n${options.description.trim()}`);
  }

  const trailers: string[] = [];
  if (options.constraint?.trim()) {
    trailers.push(`Constraint: ${options.constraint.trim()}`);
  }
  if (options.rejected?.trim()) {
    trailers.push(`Rejected: ${options.rejected.trim()}`);
  }
  if (options.evidence?.trim()) {
    trailers.push(`Evidence: ${options.evidence.trim()}`);
  }

  if (trailers.length > 0) {
    parts.push(`\n${trailers.join('\n')}`);
  }

  return parts.join('\n');
}

export function isGhInstalled(): boolean {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export async function createGhRepo(
  org: string,
  repoName: string,
  description: string,
  isPrivate: boolean = true
): Promise<{ success: boolean; output: string }> {
  if (!isGhInstalled()) {
    return {
      success: false,
      output: 'GitHub CLI (`gh`) is not installed. Please install it with `brew install gh` and run `gh auth login`.',
    };
  }

  try {
    const visibilityFlag = isPrivate ? '--private' : '--public';
    const { stdout, stderr } = await execFileAsync('gh', [
      'repo',
      'create',
      `${org}/${repoName}`,
      visibilityFlag,
      '--description',
      description,
    ]);
    return { success: true, output: stdout || stderr };
  } catch (error: any) {
    return { success: false, output: error?.message || String(error) };
  }
}

export async function createGhPr(
  cwd: string,
  title: string,
  body: string,
  base: string = 'main'
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!isGhInstalled()) {
    return {
      success: false,
      error: 'GitHub CLI (`gh`) is not installed. Please install it with `brew install gh` and run `gh auth login`.',
    };
  }

  try {
    const { stdout } = await execFileAsync(
      'gh',
      ['pr', 'create', '--title', title, '--body', body, '--base', base],
      { cwd }
    );
    return { success: true, url: stdout.trim() };
  } catch (error: any) {
    return { success: false, error: error?.message || String(error) };
  }
}

export async function createGhIssue(
  cwd: string,
  repo: string,
  title: string,
  body: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!isGhInstalled()) {
    return {
      success: false,
      error: 'GitHub CLI (`gh`) is not installed.',
    };
  }

  try {
    const { stdout } = await execFileAsync(
      'gh',
      ['issue', 'create', '--repo', repo, '--title', title, '--body', body],
      { cwd }
    );
    return { success: true, url: stdout.trim() };
  } catch (error: any) {
    return { success: false, error: error?.message || String(error) };
  }
}

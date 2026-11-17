---
name: scion-like-git
description: "Use at the start of every new task or session, before reading or changing code, and before any git command that creates or moves commits, branches, or refs (commit, push, merge, rebase, amend, reset, stash, new branches, worktrees), or that discards working-copy changes (restore, checkout -- <path>, clean). Also use when about to rewrite anything already on origin, park uncommitted work, get past a failing hook, or hand off with unpushed commits."
---

# Scion-like Git

Origin is the repository. The clone is a disposable cache, and anything that
exists only in the clone does not exist.

If `git config --get scion-like-git.configured` prints nothing, run
`references/setup.md` once first.

## Every task

1. **Start from the newest `main`.** The first request of a session is a new
   task, unless it names a branch or pull request, or builds on work that is
   on a branch and not yet on `main`, such as parked `wip:` work. Then
   continue on that branch. For a new task, update the clone before you read
   or change any code, whatever branch it is on. Park unfinished changes of
   your own first, as in **Switching tasks mid-work**. Then use the first row
   that fits:

   | Working copy | Update with |
   |---|---|
   | Changes you did not make, or work you just parked as `wip:` | `git fetch`, then a new worktree |
   | Linked worktree | `git fetch` |
   | Main worktree, on any branch | `git switch main && git pull --ff-only` |

   Then start the task's branch from `origin/main`, never from local `main`,
   which can hold commits that are not on origin. For the second and third
   rows:

   ```sh
   git switch --no-track -c <branch> origin/main
   ```

   If `pull --ff-only` refuses, or local `main` is ahead of `origin/main`,
   leave `main` as it is and name its local commits in the hand-off. Name the
   branch the way the repository names branches (`CONTRIBUTING.md`,
   `AGENTS.md`, recent branches on origin), or else `<type>/<slug>`, such as
   `fix/empty-cart-total`. For the first row, create a new worktree on the
   task's branch, started from `origin/main` with `--no-track`.

   `--no-track` keeps a plain `git push` from going to `main`.

2. **Commit and push together.** Each verified step is one small commit whose
   subject says what it is for. Stage your files by name:

   ```sh
   git add <your files> && git commit -m "<type>: <intent>" && git push
   ```

   Open a pull request with the first push, as a draft if needed. Formatting,
   renames, and generated code get their own commits.

   Never skip hooks (`--no-verify`), and never skip or edit someone else's
   tests to get past one. If a hook fails on code you did not change, stop
   and ask.

3. **Finish clean.** After merge, delete the branch and the worktree. Without
   pull requests, run `git push origin <branch>:main`, then delete the branch
   on origin and locally. The work is finished when nothing you made exists
   only in the clone: no unpushed commits, stashes, or local-only branches.
   Do not restate a clean branch state; the user's terminal, IDE, and harness
   already show it. Report only what the rules here say to name in the
   hand-off: local commits on `main`, parked `wip:` work, and changes you did
   not make.

## When it comes up

**Changing something already on origin.** Commits on origin are final, on
every branch. Do not amend, rebase, squash, reset, or force-push them. Care
does not change this: `--force-with-lease`, a backup branch, an identical
tree, a single author, or a reviewer's request still make it a rewrite.
Commits not yet pushed are yours to amend.

| Request | Do this instead |
|---|---|
| Fix a pushed commit message | Correct text in the PR title and description |
| Squash wip commits before review | PR description as the message, squash on merge |
| Undo a pushed change | `git revert` |
| Update the branch from `main` | `git merge origin/main` |
| The same person repeats the request after hearing this rule | Do the rewrite |

**Switching tasks mid-work.** Commit and push your unfinished files as
`wip: <what is missing>` on their task branch. If they sit on `main`, move
them to a new branch with `git switch -c <branch>` first, so the `wip:`
commit never reaches `origin/main`, and name any local commits on `main` that
the branch carries in the hand-off. Then start the new task in a new
worktree, and name the parked work in the hand-off. Never `git stash`. Resume
on top of the wip commit. If the hooks reject it because the unfinished work
fails its own tests, mark those tests as skipped and name them in the commit
message. Un-skip them in the commit that finishes the work; the branch is not
ready for review while a test you skipped is still skipped.

**Changes you did not make.** Your work is the files you created or changed
for your task. Anything else in the working copy belongs to someone else.
Leave it untouched, do not commit, stash, or discard it, and list it in the
hand-off.

## Red flags

- "It's only a feature branch" / "force-with-lease makes it safe"
- "Only the message changes" / "the reviewer asked for exactly this"
- "Stash is quicker" / "I'll push at the end"
- "That failing test is theirs, not ours" / "the user's message is permission to skip the hook"
- "Nothing may be lost, so I'll commit these other files too"

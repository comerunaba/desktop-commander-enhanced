import assert from 'node:assert/strict';
import { runInSessionContext } from '../dist/session-context.js';
import { terminalManager } from '../dist/terminal-manager.js';

const startFor = (conversation) => runInSessionContext(conversation, () =>
  terminalManager.executeCommand('while ($true) { Write-Output tick; Start-Sleep -Milliseconds 250 }', 700, 'powershell.exe'));
const sessionsFor = (conversation) => runInSessionContext(conversation, () =>
  terminalManager.listActiveSessions());
const canSee = (conversation, pid) => runInSessionContext(conversation, () =>
  Boolean(terminalManager.getSession(pid)));
const stopFor = (conversation, pid) => runInSessionContext(conversation, () =>
  terminalManager.forceTerminate(pid));

let first;
let second;
try {
  [first, second] = await Promise.all([startFor('chat-alpha'), startFor('chat-beta')]);
  assert.ok(first.pid > 0 && second.pid > 0, 'both terminal processes should start');
  assert.notEqual(first.pid, second.pid, 'each chat should get its own process id');

  const [alphaSessions, betaSessions] = await Promise.all([
    sessionsFor('chat-alpha'), sessionsFor('chat-beta'),
  ]);
  assert.deepEqual(alphaSessions.map((session) => session.pid), [first.pid]);
  assert.deepEqual(betaSessions.map((session) => session.pid), [second.pid]);
  assert.equal(await canSee('chat-alpha', second.pid), false);
  assert.equal(await canSee('chat-beta', first.pid), false);

  console.log('PASS concurrent conversations own separate terminal processes and output stores');
} finally {
  if (first?.pid > 0) stopFor('chat-alpha', first.pid);
  if (second?.pid > 0) stopFor('chat-beta', second.pid);
}

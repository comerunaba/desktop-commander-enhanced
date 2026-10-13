import { AsyncLocalStorage } from 'node:async_hooks';

const sessionContext = new AsyncLocalStorage<string | undefined>();

/** The OpenAI conversation id from _meta["openai/session"], when supplied. */
export function getCurrentSessionId(): string | undefined {
  return sessionContext.getStore();
}

/** Run one MCP request in its conversation context, safely across concurrent calls. */
export function runInSessionContext<T>(sessionId: unknown, fn: () => T): T {
  const normalized = typeof sessionId === 'string' && sessionId.trim()
    ? sessionId.trim()
    : undefined;
  return sessionContext.run(normalized, fn);
}

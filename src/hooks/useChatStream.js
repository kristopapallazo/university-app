import { useRef } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { storage } from '@/utils/storage';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://university-api-production.up.railway.app';

/**
 * Returns a `sendMessage` function that POSTs a message to the chat endpoint
 * and streams the assistant reply token by token via SSE.
 *
 * Usage:
 *   const { sendMessage, abort } = useChatStream();
 *   await sendMessage(convId, text, { onToken, onDone, onError });
 */
export function useChatStream() {
  const controllerRef = useRef(null);

  const abort = () => {
    controllerRef.current?.abort();
  };

  const sendMessage = (conversationId, content, { onToken, onDone, onError }) => {
    abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    return fetchEventSource(`${BASE_URL}/api/v1/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storage.getToken()}`,
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({ content }),
      signal: controller.signal,

      async onopen(response) {
        if (!response.ok) {
          throw new Error(`Chat stream failed: ${response.status}`);
        }
      },

      onmessage(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'token') {
          onToken?.(data.content);
        } else if (data.type === 'done') {
          onDone?.();
        } else if (data.type === 'error') {
          onError?.(data.message);
        }
      },

      onerror(error) {
        if (error.name === 'AbortError') return;
        onError?.('Dija ndeshi një problem. Provo përsëri.');
        throw error;
      },
    });
  };

  return { sendMessage, abort };
}

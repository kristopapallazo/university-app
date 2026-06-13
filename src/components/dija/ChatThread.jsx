import { useEffect, useRef, useState } from 'react';
import { Input, Button, Alert } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import MessageBubble from './MessageBubble';
import { useChatStream } from '@/hooks/useChatStream';

export default function ChatThread({ conversationId, initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const { sendMessage, abort } = useChatStream();

  // Scroll to bottom on new tokens
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setError(null);
    setInput('');

    // Append user message immediately
    const userMsg = { role: 'user', content: text };
    const dijaMsg = { role: 'assistant', content: '', streaming: true };
    setMessages((prev) => [...prev, userMsg, dijaMsg]);
    setStreaming(true);

    try {
      await sendMessage(conversationId, text, {
        onToken: (token) => {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, content: last.content + token };
            return next;
          });
        },
        onDone: () => {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], streaming: false };
            return next;
          });
          setStreaming(false);
        },
        onError: (msg) => {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              ...next[next.length - 1],
              content: msg,
              streaming: false,
              isError: true,
            };
            return next;
          });
          setStreaming(false);
          setError(msg);
        },
      });
    } catch {
      setStreaming(false);
    }
  };

  // Cleanup stream on unmount — abort is stable (ref-based), safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => abort(), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Message list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#999', marginTop: 40, fontSize: 13 }}>
            Shkruaj një mesazh për të filluar bisedën me Dija.
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} streaming={msg.streaming} />
        ))}
        {error && (
          <Alert message={error} type="error" showIcon style={{ margin: '8px 0', fontSize: 12 }} />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px', borderTop: '1px solid #f0f0f0' }}>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Shkruaj një mesazh..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={streaming}
          style={{ borderRadius: 8, marginBottom: 8 }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={streaming}
          disabled={!input.trim()}
          style={{ width: '100%', borderRadius: 8 }}
        >
          Dërgo
        </Button>
      </div>
    </div>
  );
}

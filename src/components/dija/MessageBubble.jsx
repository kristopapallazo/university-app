import { Typography, Spin } from 'antd';

const { Text } = Typography;

export default function MessageBubble({ role, content, streaming }) {
  const isUser = role === 'user';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 12,
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#1677ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            marginRight: 8,
            flexShrink: 0,
            alignSelf: 'flex-end',
          }}
        >
          D
        </div>
      )}

      <div
        style={{
          maxWidth: '75%',
          padding: '8px 12px',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isUser ? '#1677ff' : '#f0f0f0',
          color: isUser ? '#fff' : '#000',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {streaming && !content ? (
          <Spin size="small" />
        ) : (
          <Text style={{ color: isUser ? '#fff' : '#000', fontSize: 13 }}>
            {content}
            {streaming && <span style={{ opacity: 0.5 }}>▍</span>}
          </Text>
        )}
      </div>
    </div>
  );
}

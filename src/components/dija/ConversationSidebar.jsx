import { useState, useEffect } from 'react';
import { Button, List, Typography, Spin, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { chatApi } from '@/services/chatApi';

const { Text } = Typography;

export default function ConversationSidebar({ activeId, onSelect, onNew }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await chatApi.listConversations(50);
      setConversations(res.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Expose reload so parent can call it after creating a new conversation
  ConversationSidebar.reload = load;

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await chatApi.deleteConversation(id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) onNew?.();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onNew}
        style={{ margin: '12px', borderRadius: 8 }}
      >
        Bisedë e re
      </Button>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Spin size="small" />
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <List
            dataSource={conversations}
            locale={{ emptyText: 'Nuk ka biseda' }}
            renderItem={(conv) => (
              <List.Item
                key={conv.id}
                onClick={() => onSelect(conv)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  background: activeId === conv.id ? '#e6f4ff' : 'transparent',
                  borderRadius: 8,
                  margin: '2px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <MessageOutlined style={{ color: '#1677ff', flexShrink: 0 }} />
                <Text
                  ellipsis
                  style={{ flex: 1, fontSize: 12 }}
                  title={conv.title ?? 'Bisedë pa titull'}
                >
                  {conv.title ?? 'Bisedë pa titull'}
                </Text>
                <Tooltip title="Fshi">
                  <Popconfirm
                    title="Fshi bisedën?"
                    okText="Po"
                    cancelText="Jo"
                    onConfirm={(e) => handleDelete(e, conv.id)}
                    onPopupClick={(e) => e.stopPropagation()}
                  >
                    <DeleteOutlined
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: '#ff4d4f', fontSize: 12 }}
                    />
                  </Popconfirm>
                </Tooltip>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
}

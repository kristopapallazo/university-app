import { useState } from 'react';
import { Drawer, Spin, Typography } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import ConversationSidebar from './ConversationSidebar';
import ChatThread from './ChatThread';
import { chatApi } from '@/services/chatApi';

const { Text } = Typography;

export default function DijaDrawer({ open, onClose }) {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConv, setLoadingConv] = useState(false);

  const handleSelectConversation = async (conv) => {
    setLoadingConv(true);
    try {
      const res = await chatApi.getConversation(conv.id);
      setActiveConversation(res.data.conversation);
      setMessages(res.data.messages ?? []);
    } finally {
      setLoadingConv(false);
    }
  };

  const handleNewConversation = async () => {
    const res = await chatApi.createConversation(null);
    const newConv = { id: res.data.id, title: null };
    setActiveConversation(newConv);
    setMessages([]);
    // Refresh sidebar list
    ConversationSidebar.reload?.();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={700}
      styles={{ body: { padding: 0, display: 'flex', height: '100%' } }}
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RobotOutlined style={{ color: '#1677ff' }} />
          <Text strong>Dija — Asistenti Virtual UAMD</Text>
        </span>
      }
    >
      {/* Sidebar */}
      <div
        style={{
          width: 200,
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <ConversationSidebar
          activeId={activeConversation?.id}
          onSelect={handleSelectConversation}
          onNew={handleNewConversation}
        />
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {loadingConv ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spin />
          </div>
        ) : activeConversation ? (
          <ChatThread
            key={activeConversation.id}
            conversationId={activeConversation.id}
            initialMessages={messages}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              gap: 12,
            }}
          >
            <RobotOutlined style={{ fontSize: 48, color: '#1677ff', opacity: 0.4 }} />
            <Text style={{ color: '#999' }}>Zgjidhni ose krijoni një bisedë të re.</Text>
          </div>
        )}
      </div>
    </Drawer>
  );
}

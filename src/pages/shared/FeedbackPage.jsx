import { useState } from 'react';
import { Button, Card, Form, Input, notification, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { usePageTitle } from '@/hooks/usePageTitle';
import { feedbackService } from '@/services/feedbackService';

const { Title, Paragraph } = Typography;

export default function FeedbackPage() {
  usePageTitle('Feedback');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await feedbackService.sendFeedback({
        title: values.title,
        comment: values.comment,
        rating: values.rating,
      });
      notification.success({
        message: res.message ?? 'Feedback-u u dërgua me sukses.',
      });
      form.resetFields();
    } catch (err) {
      const messageText = err?.response?.data?.message ?? 'Dërgimi i feedback-ut dështoi.';
      notification.error({ message: messageText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <Title level={3}>Feedback</Title>
      <Paragraph>
        Na ndihmo të përmirësojmë aplikacionin duke na dërguar komente, sugjerime ose probleme që
        hasët gjatë përdorimit. Ne e vlerësojmë çdo reagim.
      </Paragraph>

      <Card style={{ borderRadius: 12 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          style={{ gap: 16, display: 'flex', flexDirection: 'column' }}
        >
          <Form.Item
            name="title"
            label="Titulli"
            rules={[{ required: true, message: 'Titulli është i detyrueshëm.' }]}
          >
            <Input placeholder="Përshkruaj shkurtimisht çfarë dëshiron të ndash" />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Koment"
            rules={[{ required: true, message: 'Komentin e plotëso.' }]}
          >
            <Input.TextArea rows={6} placeholder="Shkruaj këtu komentin ose sugjerimin tënd" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Si e vlerëson eksperiencën?"
            rules={[{ required: true, message: 'Zgjidh një vlerësim.' }]}
          >
            <Input placeholder="1-5 (1 = shumë keq, 5 = shumë mirë)" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={loading}
              block
            >
              Dërgo feedback
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

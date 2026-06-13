import { useEffect, useState } from 'react';
import { Alert, Button, Card, Divider, Form, Input, Typography } from 'antd';
import { GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_DEFAULT_ROUTES, ROUTES } from '@/router/routes';

const { Title, Text } = Typography;

const OAUTH_ERRORS = {
  oauth_failed: 'Hyrja me Google dështoi. Ju lutem provoni përsëri.',
  oauth_unknown_email: 'Email-i juaj Google nuk është i regjistruar në sistem.',
};

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'https://university-api-production.up.railway.app';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If already authenticated, redirect to role default
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(ROLE_DEFAULT_ROUTES[user.role] ?? ROUTES.STUDENT.ROOT, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Show OAuth error passed via query param, then strip it from the URL
  useEffect(() => {
    const oauthError = searchParams.get('error');
    if (oauthError) {
      setError(OAUTH_ERRORS[oauthError] ?? 'Gabim gjatë hyrjes.');
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [searchParams, navigate]);

  const benefits = [
    'Hyni në portalin e universitetit me email ose Google.',
    'Merrni akses të sigurt te orari, faturat dhe notat.',
    'Dashboard i personalizuar për secilin rol përdoruesi.',
  ];
  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBenefit((current) => (current + 1) % benefits.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [benefits.length]);

  const onFinish = async ({ email, password }) => {
    if (loading) return; // guard against double-submit (Enter key + click)
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await login({ email, password });
      navigate(ROLE_DEFAULT_ROUTES[loggedInUser.role] ?? ROUTES.STUDENT.ROOT, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message;
      setError(msg ?? 'Email ose fjalëkalimi i gabuar.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/api/v1/auth/google/redirect`;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: 16,
      }}
    >
      <Card className="login-card" style={{ width: 420 }}>
        <div className="login-hero">
          <Title level={3} style={{ marginBottom: 4 }}>
            UAMD
          </Title>
          <Text type="secondary">Portali i Universitetit Aleksander Moisiu Durrës</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Email-i është i detyrueshëm.' },
              { type: 'email', message: 'Formati i email-it nuk është i saktë.' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Fjalëkalimi është i detyrueshëm.' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Fjalëkalimi" size="large" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 8 }}>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Hyr
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>
          <Text type="secondary" style={{ fontSize: 12 }}>
            OSE
          </Text>
        </Divider>

        <div className="login-feature" style={{ marginBottom: 24 }}>
          <Text strong>{benefits[activeBenefit]}</Text>
        </div>

        <Button
          size="large"
          block
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          style={{ borderColor: '#4285f4', color: '#4285f4' }}
        >
          Hyr me Google
        </Button>

        <div className="login-footer-text">
          <Text type="secondary" style={{ fontSize: 12 }}>
            Mund të hyni me llogarinë tuaj Google të universitetit ose me email + fjalëkalim.
          </Text>
        </div>
      </Card>
    </div>
  );
}

import { Button, Layout, Space } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/routes';

const { Header, Content, Footer } = Layout;

export default function PublicLayout() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="public-header">
        <div className="public-header-inner">
          <div className="public-brand" onClick={() => navigate(ROUTES.PUBLIC.ROOT)}>
            UAMD
          </div>
          <Space size="middle">
            <Button
              type="text"
              className="public-nav-link"
              onClick={() => navigate(ROUTES.PUBLIC.ROOT)}
            >
              Ballina
            </Button>
            <Button
              type="text"
              className="public-nav-link"
              onClick={() => navigate(ROUTES.PUBLIC.LAJME)}
            >
              Lajme
            </Button>
            <Button
              type="text"
              className="public-nav-link"
              onClick={() => navigate(ROUTES.PUBLIC.AKADEMIA)}
            >
              Akademia
            </Button>
            <Button type="primary" onClick={() => navigate(ROUTES.LOGIN)}>
              Hyr
            </Button>
          </Space>
        </div>
      </Header>
      <Content className="public-content">
        <Outlet />
      </Content>
      <Footer className="public-footer">
        UAMD © {new Date().getFullYear()} — Universiteti Aleksander Moisiu Durrës
      </Footer>
    </Layout>
  );
}

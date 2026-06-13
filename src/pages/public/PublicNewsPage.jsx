import { Card, Col, Row, Skeleton, Typography } from 'antd';
import { useApi } from '@/hooks/useApi';
import { lajmeService } from '@/services/lajmeService';
import { usePageTitle } from '@/hooks/usePageTitle';

const { Title, Paragraph } = Typography;

export default function PublicNewsPage() {
  usePageTitle('Lajmet');
  const { data, loading } = useApi(() => lajmeService.getLajmet(), []);
  const articles = data?.data ?? [];

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <Title>Gjithçka e re nga UAMD</Title>
      <Paragraph style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
        Lexoni njoftimet e fundit, eventet akademike dhe informacionet e rëndësishme për komunitetin universitar.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Col xs={24} md={12} key={index}>
                <Card>
                  <Skeleton active paragraph={{ rows: 4 }} />
                </Card>
              </Col>
            ))
          : articles.map((article) => (
              <Col xs={24} md={12} key={article.id}>
                <Card hoverable style={{ borderRadius: 14 }}>
                  <Title level={4} style={{ marginBottom: 12 }}>
                    {article.title}
                  </Title>
                  <Paragraph ellipsis={{ rows: 4, expandable: false }}>
                    {article.summary ?? article.body ?? 'Nuk ka përshkrim.'}
                  </Paragraph>
                  <Paragraph type="secondary" style={{ marginTop: 16 }}>
                    {new Date(article.published_at ?? article.created_at).toLocaleDateString('sq-AL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Paragraph>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
}

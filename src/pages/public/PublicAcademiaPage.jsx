import { Card, Col, Row, Skeleton, Typography } from 'antd';
import { useApi } from '@/hooks/useApi';
import { akademiaService } from '@/services/akademiaService';
import { usePageTitle } from '@/hooks/usePageTitle';

const { Title, Paragraph, Text } = Typography;

export default function PublicAcademiaPage() {
  usePageTitle('Akademia');
  const { data: facData, loading: facLoading } = useApi(() => akademiaService.getFakultetet(), []);
  const { data: progData, loading: progLoading } = useApi(() => akademiaService.getProgramet(), []);
  const faculties = facData?.data ?? [];
  const programs = progData?.data ?? [];

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <Title>Programet akademike</Title>
      <Paragraph style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
        Njihuni me fakultetet dhe programet e studimit në UAMD. Zgjedhja akademike fillon këtu.
      </Paragraph>

      <Row gutter={[24, 24]}> 
        <Col xs={24} md={12}>
          <Card title="Fakultetet" style={{ borderRadius: 14 }}>
            {facLoading ? (
              <Skeleton active />
            ) : faculties.length ? (
              faculties.map((faculty) => (
                <Card.Grid key={faculty.id} style={{ width: '100%', textAlign: 'left' }}>
                  <Text strong>{faculty.name}</Text>
                  <br />
                  <Text type="secondary">{faculty.description ?? 'Përshkrim i shkurtër i fakultetit.'}</Text>
                </Card.Grid>
              ))
            ) : (
              <Text type="secondary">Nuk u gjetën fakultete.</Text>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Programet" style={{ borderRadius: 14 }}>
            {progLoading ? (
              <Skeleton active />
            ) : programs.length ? (
              programs.map((program) => (
                <Card.Grid key={program.id} style={{ width: '100%', textAlign: 'left' }}>
                  <Text strong>{program.name}</Text>
                  <br />
                  <Text type="secondary">{program.faculty_name ?? program.faculty ?? 'Fakulteti i lidhur'}</Text>
                </Card.Grid>
              ))
            ) : (
              <Text type="secondary">Nuk u gjetën programe.</Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

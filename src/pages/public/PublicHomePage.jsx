import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ROUTES } from '@/router/routes';

const { Title, Paragraph } = Typography;

const rotatingSlogans = [
  'Përshpejtoni rrugën akademike me informacion të qartë dhe të sigurt.',
  'Qasuni në programet, lajmet dhe njoftimet e Universitetit.',
  'Një portal modern për studentë, pedagogë dhe administratorë.',
];

export default function PublicHomePage() {
  usePageTitle('UAMD');
  const navigate = useNavigate();
  const [activeSlogan, setActiveSlogan] = useState(0);

  useEffect(() => {
    const ticker = setInterval(() => {
      setActiveSlogan((current) => (current + 1) % rotatingSlogans.length);
    }, 4200);
    return () => clearInterval(ticker);
  }, []);

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <Card style={{ borderRadius: 16, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ padding: 36, textAlign: 'center' }}>
          <Title>Mirë se vini në UAMD</Title>
          <Paragraph style={{ maxWidth: 680, margin: '0 auto', color: 'rgba(0, 0, 0, 0.65)', fontSize: 16 }}>
            Universiteti Aleksander Moisiu Durrës ofron programe akademike të klasit të parë, një ambient sigurie dhe një rrjet mbështetës për studentët.
            Shfletoni lajmet e fundit, hulumtoni programet akademike dhe gjeni informacionin që ju duhet.
          </Paragraph>
          <Row justify="center" gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col>
              <Button type="primary" size="large" onClick={() => navigate(ROUTES.PUBLIC.LAJME)}>
                Shiko lajmet
              </Button>
            </Col>
            <Col>
              <Button size="large" onClick={() => navigate(ROUTES.PUBLIC.AKADEMIA)}>
                Programet akademike
              </Button>
            </Col>
          </Row>
        </div>
      </Card>

      <div className="public-hero-summary">
        <Paragraph className="public-slogan">{rotatingSlogans[activeSlogan]}</Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            hoverable
            onClick={() => navigate(ROUTES.PUBLIC.LAJME)}
            className="public-feature-card"
            title="Lajmet më të fundit"
          >
            <Paragraph>
              Qasuni tek njoftimet e universitetit, datat e afateve dhe aktivitetet më të rëndësishme për studentët dhe stafin.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            hoverable
            onClick={() => navigate(ROUTES.PUBLIC.AKADEMIA)}
            style={{ cursor: 'pointer', borderRadius: 14 }}
            title="Akademia"
          >
            <Paragraph>
              Shikoni programet e studimit dhe fakultetet për të zgjedhur drejtuesin akademik që i përshtatet interesave tuaja.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

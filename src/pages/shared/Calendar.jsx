import { useState, useEffect } from 'react';
import { Calendar as AntdCalendar, Card, List, Badge, Typography, Spin } from 'antd';
import { usePageTitle } from '@/hooks/usePageTitle';
import { eventsService } from '@/services/eventsService';

const { Title, Text } = Typography;

// Convert backend events array to a map keyed by YYYY-MM-DD
function buildEventsMap(items) {
  const map = {};
  (items || []).forEach((ev) => {
    const date = ev.date || ev.start_date || ev.day; // support several shapes
    const key = date?.split('T')[0] ?? date;
    if (!key) return;
    if (!map[key]) map[key] = [];
    map[key].push(ev);
  });
  return map;
}

export default function Calendar() {
  usePageTitle('Kalendari');
  const [value, setValue] = useState(null);
  const [eventsMap, setEventsMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    eventsService
      .getEvents()
      .then((res) => {
        // axiosInstance unwraps data, assume res is an array of events
        const items = Array.isArray(res) ? res : (res?.data ?? []);
        if (!mounted) return;
        setEventsMap(buildEventsMap(items));
      })
      .catch(() => {
        // keep silent; global notifications handle errors
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  function dateCellRender(value) {
    const key = value.format('YYYY-MM-DD');
    const listData = eventsMap[key] || [];
    return (
      <ul className="events-list" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
        {listData.map((item, idx) => (
          <li key={idx} style={{ fontSize: 12 }}>
            <Badge
              status="processing"
              text={`${item.time ?? item.start_time ?? ''} ${item.title ?? item.name ?? ''}`}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <Title level={4}>Kalendari</Title>
      <Card>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 36 }}>
            <Spin />
          </div>
        ) : (
          <AntdCalendar dateCellRender={dateCellRender} onSelect={(d) => setValue(d)} />
        )}

        {value && (
          <div style={{ marginTop: 16 }}>
            <Text strong>Selected: </Text>
            <Text>{value.format('YYYY-MM-DD')}</Text>
            <List
              size="small"
              style={{ marginTop: 8 }}
              dataSource={eventsMap[value.format('YYYY-MM-DD')] || []}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.time ?? item.start_time ?? ''} — ${item.title ?? item.name ?? ''}`}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Card>
    </div>
  );
}

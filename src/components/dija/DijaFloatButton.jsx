import { useState } from 'react';
import { FloatButton } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import DijaDrawer from './DijaDrawer';

export default function DijaFloatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatButton
        icon={<RobotOutlined />}
        type="primary"
        tooltip="Pyet Dija"
        style={{ insetInlineEnd: 24, bottom: 24 }}
        onClick={() => setOpen(true)}
      />
      <DijaDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

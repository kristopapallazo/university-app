// Ant Design 5 theme token overrides.
// All brand colors are defined here — never hardcode colors in components.

export const antdTheme = {
  token: {
    colorPrimary: '#1255CC',
    colorSecondary: '#0ea5a4',
    colorInfo: '#1761d6',
    colorSuccess: '#389e0d',
    colorWarning: '#d46b08',
    colorError: '#cf1322',
    colorTextBase: '#1f2937',
    colorBgContainer: '#ffffff',
    borderRadius: 6,
    fontFamily: "'Inter', 'Inter var', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 15,
  },
  components: {
    Layout: {
      siderBg: '#001529',
      headerBg: '#ffffff',
    },
    Menu: {
      darkItemBg: '#001529',
      darkSubMenuItemBg: '#000c17',
    },
  },
};

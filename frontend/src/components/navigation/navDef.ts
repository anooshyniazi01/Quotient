export interface NavItemDef {
  id: string;
  label: string;
  path: string;
  icon: string;
  windowNum: string;
  badgeCount?: number;
}

export interface NavGroupDef {
  label: string;
  items: NavItemDef[];
}

export const NAV_GROUPS: NavGroupDef[] = [
  {
    label: 'Monitor',
    items: [
      { id: 'overview', label: 'Overview', path: '/overview', icon: 'overview', windowNum: '07' },
      { id: 'analytics', label: 'Analytics', path: '/analytics', icon: 'analytics', windowNum: '08' },
      { id: 'quotas', label: 'Quotas', path: '/quotas', icon: 'quotas', windowNum: '09' },
      { id: 'requests', label: 'Requests', path: '/requests', icon: 'requests', windowNum: '10' },
      { id: 'insights', label: 'Insights', path: '/insights', icon: 'insights', windowNum: '11', badgeCount: 3 },
    ],
  },
  {
    label: 'Manage',
    items: [
      { id: 'providers', label: 'Providers', path: '/providers', icon: 'providers', windowNum: '12' },
      { id: 'applications', label: 'Applications', path: '/applications', icon: 'applications', windowNum: '13' },
      { id: 'integrations', label: 'Integrations', path: '/integrations', icon: 'integrations', windowNum: '14' },
      { id: 'alerts', label: 'Alerts', path: '/alerts', icon: 'alerts', windowNum: '15', badgeCount: 2 },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { id: 'team', label: 'Team', path: '/team', icon: 'team', windowNum: '16' },
      { id: 'settings', label: 'Settings', path: '/settings', icon: 'settings', windowNum: '17' },
    ],
  },
];

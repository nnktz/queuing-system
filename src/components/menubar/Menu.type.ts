type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
};

export type MenuProps = {
  menuItems: MenuItem[];
  defaultSelectedKey: string;
};

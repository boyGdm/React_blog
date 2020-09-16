interface IMenu {
  breadcrumb:{
    [key: string]: {
      icon: React.ReactNode;
      name: string;
    }
  },
  topMenu: Array<IMenuItem>;
  sideMenu: {
    [key: string]: ISidebar;
  };
  currentSidebar: ISidebar;
  currentTopMenu: string | null;
  theme: SiderProps;
  primaryColor: string;
  drawer: boolean;
}

type IMenuItem = {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

type ISidebar = Array<ISidebarItem>;

type ISidebarItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
  routes?: Array<IMenuItem>;
}
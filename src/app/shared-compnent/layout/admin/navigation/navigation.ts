export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    //no
    id: 'navigation',
    title: 'GetAllUser',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'GetAllUser',
        type: 'item',
        url: '/Main',
        icon: 'feather icon-home'
      }
    ]
  },
 //yes
  {
    id: 'chart',
    title: 'ManageCategory',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'signup',
        title: 'ManageCategory',
        type: 'item',
        url: '/ManageCategory',
        icon: 'feather icon-at-sign',
    
      },
    
    ]
  },
  //no
  {
    id: 'chart',
    title: 'ManageService',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'apexchart',
        title: 'ManageService',
        type: 'item',
        url: '/ManageService',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  //no
  {
    id: 'forms & tables',
    title: 'ManageOrder',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms',
        title: 'ManageOrder',
        type: 'item',
        url: '/ManageOrder',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
  
    ]
  },
  //yes
  {
    id: 'Authentication',
    title: 'ManageCategory',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'signup',
        title: 'ManageProblem',
        type: 'item',
        url: '/ManageProblem',
        icon: 'feather icon-at-sign',
       
      },
    
    ]
  },
 
 /*
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'menu-level',
        title: 'Menu Levels',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Menu Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Menu Level 2.2',
            type: 'collapse',
            children: [
              {
                id: 'menu-level-2.2.1',
                title: 'Menu Level 2.2.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-2.2.2',
                title: 'Menu Level 2.2.2',
                type: 'item',
                url: 'javascript:',
                external: true
              }
            ]
          }
        ]
      }
    ]
  }
  */
];

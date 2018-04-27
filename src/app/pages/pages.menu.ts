export const PAGES_MENU = [
  {
    path: 'app',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'transaction',
        data: {
          menu: {
            title: 'Transactions',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'History',
              }
            }
          },
          {
            path: 'send',
            data: {
              menu: {
                title: 'Send',
              }
            }
          }
        ]
      }
    ]
  }
];

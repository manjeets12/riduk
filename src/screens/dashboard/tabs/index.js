'use strict';

import { NavigationActions, TabNavigator} from 'react-navigation';

import Chats from './ChatsTab';
import Feeds from './FeedsTab';
import Maps from './MapsTab';
import Contacts from './ContactsTab';

export const DashboardTabs = TabNavigator({
  Feeds: { screen: Feeds },
  //Maps:{screen:Maps}
  Contacts:{screen:Contacts},
  Chats: { screen: Chats },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
});

//
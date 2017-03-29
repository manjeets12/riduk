'use strict';

import { NavigationActions, TabNavigator} from 'react-navigation';

import Chats from './ChatsTab';
import Feeds from './FeedsTab';
import Maps from './MapsTab';

export const DashboardTabs = TabNavigator({
  Feeds: { screen: Feeds },
  Maps:{screen:Maps}
  Chats: { screen: Chats },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
});

//
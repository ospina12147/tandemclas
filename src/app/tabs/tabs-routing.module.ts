import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module').then( m => m.CoursesPageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('../my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      },
      {
        path: 'courses-inscript',
        loadChildren: () => import('../courses-inscript/courses-inscript.module').then( m => m.CoursesInscriptPageModule)
      },
      {
        path: 'list-wish',
        loadChildren: () => import('../list-wish/list-wish.module').then( m => m.ListWishPageModule)
      },
      {
        path: 'rewievs',
        loadChildren: () => import('../rewievs/rewievs.module').then( m => m.RewievsPageModule)
      },
      {
        path: 'try-quest',
        loadChildren: () => import('../try-quest/try-quest.module').then( m => m.TryQuestPageModule)
      },
      {
        path: 'quest-and-respond',
        loadChildren: () => import('../quest-and-respond/quest-and-respond.module').then( m => m.QuestAndRespondPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then( m => m.CalendarPageModule)
      },
      {
        path: 'detail-topic',
        loadChildren: () => import('../detailTopic/detail-topic/detail-topic.module').then( m => m.DetailTopicPageModule)
      },
      {
        path: 'order-history',
        loadChildren: () => import('../orderHistory/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
      },
      {
        path: 'list-assigment',
        loadChildren: () => import('../listAssignment/list-assigment/list-assigment.module').then( m => m.ListAssigmentPageModule)
      },
      {
        path: 'list-notification',
        loadChildren: () => import('../listNotification/list-notification/list-notification.module').then( m => m.ListNotificationPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

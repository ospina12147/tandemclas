import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'modal-edit-valoration',
    loadChildren: () => import('./modals/modal-edit-valoration/modal-edit-valoration/modal-edit-valoration.module').then( m => m.ModalEditValorationPageModule)
  },
  {
    path: 'modal-details-quiz',
    loadChildren: () => import('./modals/modal-details-quiz/modal-details-quiz/modal-details-quiz.module').then( m => m.ModalDetailsQuizPageModule)
  },
  {
    path: 'modal-detail-course',
    loadChildren: () => import('./modals/modal-detail-course/modal-detail-course/modal-detail-course.module').then( m => m.ModalDetailCoursePageModule)
  },
  {
    path: 'send-assigment-modal',
    loadChildren: () => import('./modals/sendAssigmentModal/send-assigment-modal/send-assigment-modal.module').then( m => m.SendAssigmentModalPageModule)
  },
  {
    path: 'send-quiz-modal',
    loadChildren: () => import('./modals/sendQuizModal/send-quiz-modal/send-quiz-modal.module').then( m => m.SendQuizModalPageModule)
  },
  {
    path: 'modal-buy-course',
    loadChildren: () => import('./modalBuyCourse/modal-buy-course/modal-buy-course.module').then( m => m.ModalBuyCoursePageModule)
  },
  {
    path: 'ansers-question-quiz',
    loadChildren: () => import('./answersQuestionQuiz/ansers-question-quiz/ansers-question-quiz.module').then( m => m.AnsersQuestionQuizPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'note',
    pathMatch: 'full',
  },


  {
    path: 'create-message',
    loadChildren: () =>
      import('./create-message/create-message.module').then(
        (m) => m.CreateMessagePageModule
      ),
  },
  {
    path: 'note',
    loadChildren: () =>
      import('./note/note.module').then((m) => m.NotePageModule),
  },
  {
    path: 'note/:page',
    loadChildren: () =>
      import('./note/note.module').then((m) => m.NotePageModule),
  },
  {
    path: 'edit-message/:id',
    loadChildren: () => import('./edit-message/edit-message.module').then( m => m.EditMessagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

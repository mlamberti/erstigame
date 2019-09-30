import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path: 'registry', loadChildren: './registry/registry.module#RegistryPageModule' },
  { path: '', canActivate: [AuthGuard], children:
    [
      { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
      { path: 'camera', loadChildren: './camera/camera.module#CameraPageModule' },
      { path: 'hashtag-info', loadChildren: './hashtag-info/hashtag-info.module#HashtagInfoPageModule' },
      { path: 'token', loadChildren: './token/token.module#TokenPageModule' },
      { path: 'personhours', loadChildren: './personhours/personhours.module#PersonhoursPageModule' },
      { path: 'hashtag-modal', loadChildren: './hashtag-modal/hashtag-modal.module#HashtagModalPageModule' },
      { path: 'rallyepoints', loadChildren: './rallyepoints/rallyepoints.module#RallyepointsPageModule' },
      { path: 'dsgvo', loadChildren: './dsgvo/dsgvo.module#DsgvoPageModule' },
      { path: '**', redirectTo: ''},
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

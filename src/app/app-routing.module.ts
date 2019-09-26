import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'camera', loadChildren: './camera/camera.module#CameraPageModule' },
  { path: 'hashtag-info', loadChildren: './hashtag-info/hashtag-info.module#HashtagInfoPageModule' },
  { path: 'registry/:token', loadChildren: './registry/registry.module#RegistryPageModule' },
  { path: 'registry', loadChildren: './registry/registry.module#RegistryPageModule' },
  { path: 'token/:token', loadChildren: './token/token.module#TokenPageModule'},
  { path: 'token', loadChildren: './token/token.module#TokenPageModule' },
  { path: 'personhours', loadChildren: './personhours/personhours.module#PersonhoursPageModule' },
  { path: 'hashtag-modal', loadChildren: './hashtag-modal/hashtag-modal.module#HashtagModalPageModule' },
  { path: 'rallyepoints', loadChildren: './rallyepoints/rallyepoints.module#RallyepointsPageModule' },
  { path: 'rallyepoints/:token', loadChildren: './rallyepoints/rallyepoints.module#RallyepointsPageModule' },
  { path: '**', redirectTo: ''}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

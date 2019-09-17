import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'camera', loadChildren: './camera/camera.module#CameraPageModule' },
  { path: 'hashtag-info', loadChildren: './hashtag-info/hashtag-info.module#HashtagInfoPageModule' },
  { path: 'registry', loadChildren: './registry/registry.module#RegistryPageModule' },
  { path: ':token', loadChildren: './tabs/tabs.module#TabsPageModule'}
  //{ path: '**', redirectTo: 'Tokeneinlösenseite: dann Dashboard}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

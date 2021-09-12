import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./social-network/modules/feature/core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'covid',
    loadChildren: () => import('./covid-feature/covid-core.module').then(m => m.CovidCoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

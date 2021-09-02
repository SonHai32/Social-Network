import { LoadingReducer } from '../store/app-loading/loading.reducers';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
LoadingReducer


@NgModule({
  imports: [StoreModule.forFeature('feature_loading', LoadingReducer)]
})
export class LoadingModule{}

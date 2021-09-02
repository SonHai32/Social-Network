import { map } from 'rxjs/operators';
import { Observable, combineLatest, MonoTypeOperatorFunction } from 'rxjs';
import  firebase from 'firebase/app'

export function mapTimestamp<TData = any>(): MonoTypeOperatorFunction<TData[]>{
  return map((item: TData[]) => item.map((item) =>({
    ...item,
    created_at: ((item as any)?.created_at as firebase.firestore.Timestamp).toDate()
  })))
}
export function vmFromLatest<TVm extends {}, TComputedVM extends {} = any>(
  vmBase: { [K in keyof TVm]: Observable<TVm[K]> },
  manipulateFunction?: (vmBaseReturn: TVm) => TComputedVM
): Observable<TVm & TComputedVM> {
  return combineLatest(Object.values(vmBase)).pipe(
    map(responses => {
      const returnVM = Object.keys(vmBase).reduce((vm: any, key, index) => {
        vm[key] = responses[index];
        return vm;
      }, {} as TVm);
      if (manipulateFunction) {
        const manipulatedVm = manipulateFunction(returnVM);
        return Object.assign(returnVM, manipulatedVm) as TVm & TComputedVM;
      }

      return returnVM as TVm & TComputedVM;
    })
  );
}

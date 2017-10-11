import { BehaviorSubject } from 'rxjs/Rx';

export class ActivatedRouteMock {

  private _paramsSubject = new BehaviorSubject(this.testParams);
  private _testParams: {};

  params = this._paramsSubject.asObservable();

  get testParams() {
    return this._testParams;
  }

  set testParams(newParams: any) {
    this._testParams = newParams;
    this._paramsSubject.next(newParams);
  }
}
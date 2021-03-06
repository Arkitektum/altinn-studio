/* tslint:disable:max-line-length */
import { Action, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { store } from '../../../store';
import { ProcessSteps } from '../../../types';
import * as CompleteProcessActions from './completeProcess/completeProcessActions';
import * as GetProcessStateActions from './getProcessState/getProcessStateActions';

/**
 * Define a interface describing the the different Actions available
 * and which datamodel those actions expect.
 */
export interface IProcessDispatchers extends ActionCreatorsMapObject {
  getProcessState: () => Action;
  getProcessStateFulfilled: (processStep: ProcessSteps) => GetProcessStateActions.IGetProcessStateFulfilled;
  getProcessStateRejected: (result: Error) => GetProcessStateActions.IGetProcessStateRejected;
  completeProcess: () => Action;
  completeProcessFulfilled: (processStep: ProcessSteps) => CompleteProcessActions.ICompleteProcessFulfilled;
  completeProcessRejected: (error: Error) => CompleteProcessActions.ICompleteProcessRejected;
}

/**
 * Define mapping between action and Action dispatcher method
 */

const actions: IProcessDispatchers = {
  getProcessState: GetProcessStateActions.getProcessStateAction,
  getProcessStateFulfilled: GetProcessStateActions.getProcessStateFulfilledAction,
  getProcessStateRejected: GetProcessStateActions.getProcessStateRejectedAction,
  completeProcess: CompleteProcessActions.completeProcess,
  completeProcessFulfilled: CompleteProcessActions.getProcessStateFulfilledAction,
  completeProcessRejected: CompleteProcessActions.getProcessStateRejectedAction,
};

/**
 * Bind action creators to redux store
 */
const ProcessDispatcher: IProcessDispatchers = bindActionCreators<
  any,
  IProcessDispatchers
>(actions, store.dispatch);

/**
 * Export the dispatcher to be used from REACT components
 */
export default ProcessDispatcher;

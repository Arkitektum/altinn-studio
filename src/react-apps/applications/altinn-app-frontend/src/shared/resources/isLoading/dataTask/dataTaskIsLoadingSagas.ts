import { SagaIterator } from 'redux-saga';
import { all, call, take } from 'redux-saga/effects';
import { MAP_ATTACHMENTS_FULFILLED } from '../../attachments/attachmentActionTypes';
import { GET_INSTANCEDATA_FULFILLED } from '../../instanceData/get/getInstanceDataActionTypes';
import { FETCH_FORM_CONFIG_FULFILLED } from './../../../../features/form/config/actions/types';
import { FETCH_FORM_DATA_FULFILLED } from './../../../../features/form/data/actions/types';
import { FETCH_DATA_MODEL_FULFILLED } from './../../../../features/form/datamodell/actions/types';
import { FETCH_FORM_LAYOUT_FULFILLED } from './../../../../features/form/layout/actions/types';
import { FETCH_RULE_MODEL_FULFILLED } from './../../../../features/form/rules/actions/types';
// import { FETCH_LANGUAGE_FULFILLED } from './../../language/fetch/fetchLanguageActionTypes';
import IsLoadingActions from './../isLoadingActions';

export function* watcherFinishDataTaskIsloadingSaga(): SagaIterator {
  yield all([
    take(FETCH_DATA_MODEL_FULFILLED),
    take(FETCH_FORM_CONFIG_FULFILLED),
    take(FETCH_FORM_DATA_FULFILLED),
    take(FETCH_FORM_LAYOUT_FULFILLED),
    // take(FETCH_LANGUAGE_FULFILLED), TODO: Fix when new language feature is implemented
    take(FETCH_RULE_MODEL_FULFILLED),
    take(GET_INSTANCEDATA_FULFILLED),
    take(MAP_ATTACHMENTS_FULFILLED),
  ]);

  yield call(IsLoadingActions.finishDataTaskIsloading);
}

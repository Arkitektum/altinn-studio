import { SagaIterator } from 'redux-saga';
import { call, select, takeEvery } from 'redux-saga/effects';
import { IAttachment } from './..';
import { getFileUploadComponentValidations } from './../../../../components/base/FileUploadComponent';
import FormValidationsDispatcher from './../../../../features/form/validation/actions';
import { IRuntimeState } from './../../../../types';
import { post } from './../../../../utils/networking';
import { fileUploadUrl } from './../../../../utils/urlHelper';
import AttachmentDispatcher from './../attachmentActions';
import * as AttachmentActionsTypes from './../attachmentActionTypes';
import * as uploadActions from './uploadAttachmentActions';

export function* uploadAttachmentSaga(
  { file, attachmentType, tmpAttachmentId, componentId }: uploadActions.IUploadAttachmentAction): SagaIterator {
  const state: IRuntimeState = yield select();
  const language = state.language.language;

  try {
    // Sets validations to empty.
    const newValidations = getFileUploadComponentValidations(null, null);
    yield call(FormValidationsDispatcher.updateComponentValidations, newValidations, componentId);

    const data = new FormData();
    data.append('file', file);

    const fileUploadLink = fileUploadUrl(attachmentType, file.name);
    const response: any = yield call(post, fileUploadLink, null, data);

    if (response.status === 200) {
      const attachment: IAttachment
        = { name: file.name, size: file.size, uploaded: true, id: response.data.id, deleting: false };
      yield call(AttachmentDispatcher.uploadAttachmentFulfilled,
        attachment, attachmentType, tmpAttachmentId, componentId);
    } else {
      const validations = getFileUploadComponentValidations('upload', language);
      yield call(FormValidationsDispatcher.updateComponentValidations, validations, componentId);
      yield call(AttachmentDispatcher.uploadAttachmentRejected,
        tmpAttachmentId, attachmentType, componentId);
    }
  } catch (err) {
    const validations = getFileUploadComponentValidations('upload', language);
    yield call(FormValidationsDispatcher.updateComponentValidations, validations, componentId);
    yield call(AttachmentDispatcher.uploadAttachmentRejected,
      tmpAttachmentId, attachmentType, componentId);
  }
}

export function* watchUploadAttachmentSaga(): SagaIterator {
  yield takeEvery(AttachmentActionsTypes.UPLOAD_ATTACHMENT, uploadAttachmentSaga);
}

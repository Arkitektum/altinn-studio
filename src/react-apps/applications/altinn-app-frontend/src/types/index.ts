import { IIsLoadingState } from 'src/shared/resources/isLoading/isLoadingReducers';
import { IFormConfigState } from '../features/form/config/reducer';
import { IFormDataState } from '../features/form/data/reducer';
import { IDataModelState } from '../features/form/datamodell/reducer';
import { IFormDynamicState } from '../features/form/dynamics';
import { ILayoutState } from '../features/form/layout/reducer';
import { IValidationState } from '../features/form/validation/reducer';
import { IInstantiationState } from '../features/instantiate/instantiation/reducer';
import { IApplicationMetadataState } from '../shared/resources/applicationMetadata/reducer';
import { IAttachmentState } from '../shared/resources/attachments/attachmentReducer';
import { IInstanceDataState } from '../shared/resources/instanceData/instanceDataReducers';
import { ILanguageState } from '../shared/resources/language/languageReducers';
import { IOrgsState } from '../shared/resources/orgs/orgsReducers';
import { IPartyState } from '../shared/resources/party/partyReducers';
import { IProcessState } from '../shared/resources/process/processReducer';
import { IProfileState } from '../shared/resources/profile/profileReducers';
import { ITextResourcesState } from '../shared/resources/textResources/reducer';

export interface IRuntimeState {
  applicationMetadata: IApplicationMetadataState;
  attachments: IAttachmentState;
  formConfig: IFormConfigState;
  formData: IFormDataState;
  formDataModel: IDataModelState;
  formDynamics: IFormDynamicState;
  formLayout: ILayoutState;
  formValidations: IValidationState;
  instanceData: IInstanceDataState;
  instantiation: IInstantiationState;
  isLoading: IIsLoadingState;
  language: ILanguageState;
  organisationMetaData: IOrgsState;
  party: IPartyState;
  process: IProcessState;
  profile: IProfileState;
  textResources: ITextResourcesState;
}

export interface IAltinnWindow extends Window {
  org: string;
  app: string;
  instanceId: string;
  reportee: string;
  partyId: number;
}

export enum ProcessSteps {
  Unknown = 0,
  FormFilling = 1,
  Archived = 2,
}

export enum Severity {
  Unspecified = 0,
  Error =  1,
  Warning = 2,
  Informational = 3,
}

export interface IValidationIssue {
  severity: Severity;
  scope: string;
  targetId: string;
  field: string;
  code: string;
  description: string;
}

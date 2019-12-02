export interface IAltinnWindow extends Window {
  org: string;
  app: string;
}

export interface IInstanceState {
  isDeleted: boolean;
  isMarkedForHardDelete: boolean;
  isArchived: boolean;
}

export interface ISelfLinks {
  apps: string;
  platform: string;
}

export interface IData {
  id: string;
  dataType: string;
  fileName: string;
  contentType: string;
  storageUrl: string;
  selfLinks: ISelfLinks;
  fileSize: number;
  isLocked: boolean;
  created: Date;
  lastChanged: Date;
}

export interface IInstance {
  id: string;
  instanceOwnerId: string;
  appId: string;
  org: string;
  created: Date;
  lastChanged: Date;
  instanceState: IInstanceState;
  data: IData[];
}

export interface IPerson {
  ssn: string;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  telephoneNumber: string;
  mobileNumber: string;
  mailingAddress: string;
  mailingPostalCode: number;
  mailingPostalCity: string;
  addressMunicipalNumber: number;
  addressMunicipalName: string;
  addressStreetName: string;
  addressHouseNumber: number;
  addressHouseLetter: string;
  addressPostalCode: number;
  addressCity: string;
}

export interface IProfileSettingPreference {
  language: number;
  preSelectedPartyId: number;
  doNotPromptForParty: boolean;
}

export interface IProfile {
  userId: number;
  userName: string;
  phoneNumber?: any;
  email?: any;
  partyId: number;
  party: IParty;
  userType: number;
  profileSettingPreference: IProfileSettingPreference;
}

export interface IDataType {
  id: string;
  allowedContentTypes: string[];
  appLogic: any;
  maxCount: number;
  minCount: number;
  shouldSign: boolean;
  shouldEncrypt: boolean;
}

export interface IApplication {
  createdBy: string;
  createdDateTime: string;
  dataTypes: IDataType[];
  id: string;
  lastChangedBy: string;
  lastChangedDateTime: string;
  maxSize: string;
  org: string;
  title: string;
  validFrom: string;
  validTo: string;
  versionId: string;
  WorkflowId: string;
}

export interface ITitle {
  nb: string;
}

export interface IAttachment {
  name: string;
  iconClass: string;
  url: string;
}

export interface IData {
  id: string;
  elementType: string;
  fileName: string;
  contentType: string;
  storageUrl: string;
  selfLinks: ISelfLinks;
  fileSize: number;
  isLocked: boolean;
  createdDateTime: Date;
  lastChangedDateTime: Date;
}

export interface IOrganisation {
  orgNumber: string;
  name: string;
  unitType: string;
  telephoneNumber: string;
  mobileNumber: string;
  faxNumber: string;
  emailAdress: string;
  internetAdress: string;
  mailingAdress: string;
  mailingPostalCode: string;
  mailingPostalCity: string;
  businessPostalCode: string;
  businessPostalCity: string;
}

export interface IParty {
  partyId: string;
  partyTypeName: number;
  orgNumber: number;
  ssn: string;
  unitType: string;
  name: string;
  isDeleted: boolean;
  onlyHierarchyElementWithNoAccess: boolean;
  person?: IPerson;
  organisation?: IOrganisation;
  childParties: IParty[];
}

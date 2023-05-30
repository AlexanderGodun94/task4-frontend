import { BaseType } from 'antd/lib/typography/Base';
import { Country, FormFile } from 'shared/types';
import { Dayjs } from 'dayjs';

export enum RequestTypeType {
  PERSONAL = 'PERSONAL',
  COMPANY = 'COMPANY',
  MANUAL = 'MANUAL',
  MANUAL_KYB = 'MANUAL_KYB'
}

export const SumsubRequestTypes = {
  [RequestTypeType.PERSONAL]: true,
  [RequestTypeType.COMPANY]: true,
  [RequestTypeType.MANUAL]: false,
  [RequestTypeType.MANUAL_KYB]: false
};


export enum RequestStatuses {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
}

export const REQUEST_STATUS_TITLE = {
  [RequestStatuses.Active]: 'Active',
  [RequestStatuses.Blocked]: 'Blocked'
};

const RequestActiveStatuses = [
  RequestStatuses.Active,
  RequestStatuses.Blocked
];
export type RequestActiveStatus = Omit<RequestStatuses, RequestStatuses.Active>;

export const RequestActiveStatusesList = RequestActiveStatuses.map(item => (
  { value: item, title: REQUEST_STATUS_TITLE[item] }
));


export const REQUEST_STATUS_COLOR = {
  [RequestStatuses.Active]: <BaseType>'success',
  [RequestStatuses.Blocked]: <BaseType>'danger'
};


export type typeCheck = {
  id: string,
  name: string,
  type: RequestTypeType,
  price: number,
  priceTest: number,
  currency: string
};

interface RequestBalanceInfo {
  balance: number,
  countAvailableReq: number,
  countTestReq: number,
  countUsedReq: number
  expirationSubscription: string | null,
  id: string,
  priceReq: number
  pricingPlanId: string | null
  paid: boolean
}

export interface IRequestType extends RequestBalanceInfo {
  typesCheck: typeCheck
}

export interface IRequest {
  applicantId: string | null
  companyId: string,
  createdAt: string,
  id: string,
  investorTypesCheck: RequestBalanceInfo
  object: string
  status: RequestStatuses
  typesCheck: typeCheck
}

export interface IRequestDetails {
  companyName: string | null
  fullName: string | null
  productCode: string | null
  applicantId: string | null
  comment: string | null
  companyId: string | null
  country: string | null
  countryId: string | null
  countryOfOriginId: string | null
  countryOfOrigin: Country | null
  countryOfTheDeal: Country | null
  deliveryCountryId: string | null
  deliveryCountry: Country | null
  createdAt: string
  dob: string | null
  id: string
  investorDocuments: {
    id: string,
    investorId: string, requestId: string, documentURL: string
  }[]
  object: string | null
  plannedDeliveryDate: string | null
  registrationNumber: string | null
  reportLink: string | null
  status: RequestStatuses
  typeOfCheck: string | null,
  typesCheck: typeCheck
}

export type AttachedFile = {
  fileType: string,
  countryId: string,
  file: FormFile
}

export enum GoodsCheckTypes {
  standart = 'STANDART',
  deep = 'DEEP_GOODS_SANCTION_SEARCH'
}

export type GoodsRequestCheckType = 'STANDART' | 'DEEP_GOODS_SANCTION_SEARCH';

interface CreateRequestCommonForm {
  comment?: string,
  attachedFiles?: AttachedFile[]
}

export interface CreateCompanyRequestForm extends CreateRequestCommonForm {
  companyName: string,
  registrationNumber: string,
  countryId: string,
}

export interface CreatePersonalRequestForm extends CreateRequestCommonForm {
  firstName: string,
  lastName: string,
  middleName: string,
  dob: Date
}

export interface CreateGoodsRequestForm extends CreateRequestCommonForm {
  productCode: string,
  countryOfOriginId: string
  deliveryCountryId: string,
  countryOfTheDeal: string,
  typeOfCheck: GoodsRequestCheckType,
  plannedDeliveryDate: Date
}

export type CreateRequestForm = CreateCompanyRequestForm | CreatePersonalRequestForm | CreateGoodsRequestForm

export type CreateRequestApiParams = {
  investorTypesCheckId: string,
  companyName: string,
  registrationNumber: string,
  countryId: string,
}

export type GetRequestsApiParams = {
  reverse?: boolean
  take?: number | string
  skip?: number | string
  fromDate?: Date | Dayjs | null
  toDate?: Date | Dayjs | null
  type?: string | null
  status?: RequestActiveStatus | null
  requestId?: string | number
};

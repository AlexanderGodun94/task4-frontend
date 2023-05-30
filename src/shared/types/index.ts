import { Rule as RuleType } from 'antd/lib/form';

export enum AuthPage {
  ENTER_EMAIL = 'enter-email',
  CONFIRM_EMAIL = 'confirm-email',
  ENTER_PHONE = 'enter-phone',
  CONFIRM_PHONE = 'confirm-phone'
}

export enum AuthType {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up'
}

export type Rule = RuleType;

enum AccountStatus {
  ACTIVE,
  NOT_ACTIVE
}
export enum AccountRole {
  investor = 'investor',
  admin = 'admin'
}

export interface IInvestor {
  accountStatus: AccountStatus,
  applicantId: string | null,
  avatar: string | null,
  conditionsRegistration: { verifiedEmail: boolean, verifiedPhone: boolean },
  createdAt: string,
  dateOfBirth: string,
  email: string,
  firstName: string | null,
  id: string,
  lastName: string | null,
  patronymic: string | null
  percentRegistrationCompleted: number | null
  phone: string | null
  registrationFinished: boolean
  role: AccountRole,
  updatedAt: string
}

export interface ICreateInvestor extends IInvestor {
  accessToken: string
}

export type Country = {
  code: string,
  country: string,
  id: string,
  status?: string
}

export type FormFile = { file: { originFileObj: File } }

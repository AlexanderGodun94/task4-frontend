const addZero = (val: string | number) => {
  return `0${val}`.slice(-2);
};

export const displayDate = (date: string | Date, showTime = false) => {
  if (date) {
    const thisDate = typeof date === 'string' ? new Date(date) : date;
    return `${addZero(thisDate.getDate())}.${addZero(thisDate.getMonth() + 1)}.${thisDate.getFullYear()}
    ${showTime ? ` ${addZero(thisDate.getHours())}:${addZero(thisDate.getMinutes())}` : ''}`;
  }

  return '';
};

export const getUrlName = (url: string, index: number | '' = '') => {
  try {
    const array = url.split('/');
    const array2 = array[array.length - 1].split('-');
    return array2[array2.length - 1];
  } catch (e) {
    return `File ${index}`;
  }
};

export const displayConstValue = (value: string) => {
  const str = value.toLowerCase().replaceAll('_', ' ');

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const DEFAULT_ERROR = 'Something went wrong';
const ERROR_TEXT: any = {
  SERVER_ERROR: DEFAULT_ERROR,
  WRONG_PASSWORD: 'Wrong password',
  BAD_DATA: DEFAULT_ERROR,
  MISSING_AUTHORIZATION_HEADER: 'Unauthorized',
  INVALID_TOKEN: 'Bad authorization',
  CONFIRM_CODE_IS_WRONG: 'Confirm code is wrong',
  CONFIRM_CODE_EXPIRED: 'Confirm code is expired',
  USER_NOT_FOUND: 'User is not found',
  INVESTOR_NOT_FOUND: 'Investor is not found',
  EMAIL_EXIST: 'Email is already taken',
  PHONE_EXIST: 'Phone is already taken',
  INVESTOR_TYPES_CHECK_NOT_FOUND: 'Request type not found',
  PRICING_PLAN_NOT_FOUND: 'Pricing plan not found',
  PAYMENT_EXIST: 'Payment exist',
  SCARCE_AVAILABLE_REQ: 'No available requests',
  DOCUMENT_TYPE_NOT_FOUND: 'Document type not found',
  COUNTRY_NOT_FOUND: 'Country not found',
  APPLICANT_NOT_FOUND: 'Applicant not found',
  COMPANY_NOT_FOUND: 'Company not found',
  REQUEST_NOT_FOUND: 'Request not found',
  INVESTOR_TYPE_CHECK_IS_PAID: 'Request type is already paid',
  INVESTOR_TYPE_CHECK_IS_NOT_PAID: 'Request type is not paid'
};
export const getErrorText = (e: any) => {
  return ERROR_TEXT[e?.response?.data?.message] || DEFAULT_ERROR;
};

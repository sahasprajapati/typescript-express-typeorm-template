import { envOrFail } from '@base/utils/env';

export const mailConfig = {
  defaultDriver: envOrFail('SMTP_PROVIDER'),
  host: envOrFail('SMTP_HOST'),
  port: parseInt(envOrFail('SMTP_PORT')),
  auth: {
    user: envOrFail('SMTP_USER'),
    pass: envOrFail('SMTP_PASS')
  },
  fromName: envOrFail('MAIL_FROM_NAME')
};

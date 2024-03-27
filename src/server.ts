import { sendEmailConsumer } from 'infra/providers/kafka/consumers/send-mail.consumer'
import { MailConsumer } from 'infra/providers/mail/consumers';

const mail = new MailConsumer();
sendEmailConsumer(mail);
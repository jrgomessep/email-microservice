import { SendMail } from "infra/models";
import { kafkaConsumer } from "../kafka.consumer";

export async function sendEmailConsumer(mail: SendMail): Promise<void> {
    console.log('EMAIL CONSUMER')
    const consumer = await kafkaConsumer("SEND_MAIL");
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageReceivedJson = JSON.parse(message.value!.toString());
            console.log(messageReceivedJson);
            await mail.sendMail(messageReceivedJson.to, messageReceivedJson.subject, messageReceivedJson.message);
        }
    })
}
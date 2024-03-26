import { kafkaConsumer } from "../kafka.consumer";

export async function sendEmailConsumer() {
    console.log('EMAIL CONSUMER')
    const consumer = await kafkaConsumer("SEND_MAIL");
    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value?.toString();
            console.log(messageToString);
        }
    })
}

sendEmailConsumer()
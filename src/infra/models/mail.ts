export interface SendMail {
    sendMail: (to: string, subject: string, message: string) => Promise<string>
}

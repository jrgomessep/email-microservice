
import { GetAccessTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { google, Auth } from 'googleapis';
import { SendMail } from 'infra/models';
import nodemailer, { Transporter } from 'nodemailer';

export default class MailConsumer implements SendMail {

    private transporter: Transporter | undefined;
    private oAuthClient: Auth.OAuth2Client | undefined;
    private accessToken: GetAccessTokenResponse | undefined;

    constructor() { }

    private async init(): Promise<void> {

        this.oAuthClient = new google.auth.OAuth2(String(process.env.OAUTH_CLIENTID), String(process.env.OAUTH_CLIENT_SECRET), String(process.env.REDIRECT_URI))
        this.oAuthClient.setCredentials({ refresh_token: String(process.env.OAUTH_REFRESH_TOKEN) });
        this.accessToken = await this.oAuthClient.getAccessToken();

        let conf: any = {
            service: String(process.env.MAIL_SERVICE),
            auth: {
                type: String(process.env.MAIL_TYPE),
                user: String(process.env.MAIL),
                clientId: String(process.env.OAUTH_CLIENTID),
                clientSecret: String(process.env.OAUTH_CLIENT_SECRET),
                refreshToken: String(process.env.OAUTH_REFRESH_TOKEN),
                accessToken: String(this.accessToken)
            }
        };
        this.transporter = nodemailer.createTransport(conf);
    }

    async sendMail(to: string, subject: string, message: string): Promise<string> {
        try {
            if (!this.accessToken || new Date(this.accessToken?.res?.data.expiry_date) < new Date()) {
                await this.init();
            }

            let mailOptions = {
                from: String(process.env.MAIL),
                to: to,
                subject: subject,
                html: message
            };

            await this.transporter?.sendMail(mailOptions);
            console.log('Mail sent successfully')
            return 'Mail sent successfully';
        } catch (error) {
            console.error('Error sending mail:', error);
            throw error;
        }
    }


}
import { MailConsumer } from '../src/infra/providers/mail/consumers'

// Mock para googleapis
jest.mock('googleapis', () => {
    const mockedOAuth2Client = {
        setCredentials: jest.fn(),
        getAccessToken: jest.fn().mockResolvedValue({ token: 'mock_access_token', res: { data: { expiry_date: Date.now() + 3600 * 1000 } } })
    };
    return {
        google: {
            auth: {
                OAuth2: jest.fn().mockReturnValue(mockedOAuth2Client)
            }
        }
    };
});

// Mock para nodemailer
jest.mock('nodemailer', () => {
    const mockedSendMail = jest.fn().mockResolvedValue('Mail sent successfully');
    const mockedCreateTransport = jest.fn().mockReturnValue({ sendMail: mockedSendMail });
    return {
        createTransport: mockedCreateTransport
    };
});

// Mock para process.env
const mockEnv = {
    OAUTH_CLIENTID: 'your_client_id',
    OAUTH_CLIENT_SECRET: 'your_client_secret',
    REDIRECT_URI: 'your_redirect_uri',
    OAUTH_REFRESH_TOKEN: 'your_refresh_token',
    MAIL_SERVICE: 'gmail',
    MAIL_TYPE: 'OAuth2',
    MAIL: 'your_email@example.com'
};

describe('Mail', () => {
    let mail: MailConsumer;

    beforeEach(() => {
        jest.clearAllMocks(); // Limpa todos os mocks antes de cada teste
        process.env = { ...mockEnv }; // Define process.env para o mockEnv
        mail = new MailConsumer(); // Cria uma nova instância de Mail antes de cada teste
    });

    test('Deve enviar e-mail corretamente', async () => {
        const to = 'recipient@example.com';
        const subject = 'Test Subject';
        const message = 'Test Message';

        await expect(mail.sendMail(to, subject, message)).resolves.toBe('Mail sent successfully');
    });
});

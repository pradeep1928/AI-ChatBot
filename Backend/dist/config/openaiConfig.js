import { Configuration } from 'openai';
export const configureOpenai = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPERN_AI_ORGANIZATION_ID
    });
    return config;
};
//# sourceMappingURL=openaiConfig.js.map
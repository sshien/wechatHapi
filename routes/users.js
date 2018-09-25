const JWT = require('jsonwebtoken');
const Joi = require('joi')
const GROUP_NAME = 'users';

module.exports = [{
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    config: {
        tags: ['api', GROUP_NAME],
        description: '登录接口',
        auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
        validate: {
            payload: {
                code: Joi.string().required().description('微信用户登录的临时code'),
                encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
                iv: Joi.string().required().description('微信用户信息iv'),
            },
        }
    },
    handler: async (request, reply) => {
        const generateJWT = (jwtInfo) => {
            const payload = {
                userId: jwtInfo.userId,
                exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
            };
            return JWT.sign(payload, process.env.JWT_SECRET);
        };
        reply(generateJWT({
            userId: 1,
        }));
    }

}];
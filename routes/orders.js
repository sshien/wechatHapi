const Joi = require('joi');
const GROUP_NAME = 'orders'

const {
    jwtHeaderDefine
} = require('../utils/router-helper');

module.exports = [{
        method: 'POST',
        path: `/${GROUP_NAME}`,
        config: {
            tags: ['api', GROUP_NAME],
            description: '创建订单',
            validate: {
                ...jwtHeaderDefine,
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer(),
                            count: Joi.number().integer()
                        })
                    )
                }
            }
        },
        handler: async (request, reply) => {
            reply()
        }
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/{orderId}/pay`,
        config: {
            tags: ['api', GROUP_NAME],
            description: '支付宝订单',
            validate: {
                ...jwtHeaderDefine,
                params: {
                    orderId: Joi.string().required().error(new Error('订单号(orderId)必须大于3位数'))
                }
            }
        },
        handler: async (reuqest, reply) => {
            reply()
        }
    }
]
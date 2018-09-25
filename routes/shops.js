const Joi = require('joi');
const {
    paginationDefine,
    jwtHeaderDefine
} = require('../utils/router-helper');
const models = require('../models');

const GROUP_NAME = 'shops';

module.exports = [{
        method: 'GET',
        path: `/${GROUP_NAME}`,
        config: {
            tags: ['api', GROUP_NAME],
            description: '获取店铺列表',
            validate: {
                ...jwtHeaderDefine,
                query: {
                    ...paginationDefine,
                },
            },
        },
        handler: async (request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.shops.findAndCountAll({
                attributes: [
                    'id',
                    'name',
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            // 开启分页的插件，返回的数据结构里，需要带上result与totalCount两个字段
            reply({
                results,
                totalCount
            });
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{shopId}/goods`,
        config: {
            tags: ['api', GROUP_NAME],
            description: '获取店铺的商品列表',
            auth: false,
            validate: {
                params: {
                    shopId: Joi.string().required().description('店铺的id'),
                },
                query: {
                    ...paginationDefine,
                },
            },
        },
        handler: async (request, reply) => {
            // 增加带有where的条件查询
            const {
                rows: results,
                count: totalCount
            } = await models.goods.findAndCountAll({
                // 基于 shop_id 的条件查询
                where: {
                    shop_id: request.params.shopId,
                },
                attributes: [
                    'id',
                    'name',
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            // 开启分页的插件，返回的数据结构里，需要带上result与totalCount两个字段
            reply({
                results,
                totalCount
            });
        }

    },
];
'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product.product', {
  only: ['create', 'find', 'findOne', 'update', 'delete'],
  config: {
    create: {
      auth: false,
    },
  },
});

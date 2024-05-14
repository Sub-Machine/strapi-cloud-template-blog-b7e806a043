'use strict';

const { createCoreRouter, createCoreController } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/products',
      handler: 'product.find',
    },
    {
      method: 'GET',
      path: '/products/:id',
      handler: 'product.findOne',
    },
    {
      method: 'POST',
      path: '/products',
      handler: 'product.create',
    },
    {
      method: 'PUT',
      path: '/products/:id',
      handler: 'product.update',
    },
    {
      method: 'DELETE',
      path: '/products/:id',
      handler: 'product.delete',
      config: {
        policies: [],
        middlewares: [],
      }
    },
    {
      method: 'GET',
      path: '/products/fetch',
      handler: 'product.fetchProducts',
      config: {
        policies: [],
        middlewares: [],
      }
    }
    // No extra PUT route here, it was redundant
  ]
}

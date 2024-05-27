'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  // Extend the default controller
  ...createCoreController('api::product.product'),

  // Add a new method to import products from the Fake Store API
  async importProducts(ctx) {
    try {
      // Fetch data from the Fake Store API
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;

      // Iterate over the fetched products and create entries in the database
      const importedProducts = [];
      for (const product of products) {
        const newProduct = await strapi.entityService.create('api::product.product', {
          data: {
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image  // Note: Handling image URLs might require additional logic
          }
        });
        importedProducts.push(newProduct);
      }

      // Send success response with imported products
      ctx.body = { message: 'Products imported successfully', data: importedProducts };
    } catch (error) {
      console.error('Error importing products:', error);
      ctx.body = { message: 'Failed to import products', error: error.message };
      ctx.status = 500;
    }
  }
}));

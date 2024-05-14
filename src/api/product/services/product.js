'use strict';

const axios = require('axios');  // Ensure axios is installed using npm or yarn

module.exports = {
  async fetchAndSaveProducts() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
      for (let product of products) {
        await strapi.entityService.create('api::product.product', {
          data: {
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image  // Handling media separately might be required
          }
        });
      }
      console.log('Products fetched and stored.');
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
};

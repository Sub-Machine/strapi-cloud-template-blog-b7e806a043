'use strict';

const axios = require('axios');

module.exports = {
  async fetchAndSaveProducts() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
      console.log('Fetched products:', products); // Log fetched products

      for (const product of products) {
        const existingProduct = await strapi.entityService.findMany('api::product.product', {
          filters: { id_integer: product.id },
        });

        if (existingProduct.length > 0) {
          console.log(`Product with id ${product.id} already exists.`);
          continue;
        }

        // Handle media upload
        const mediaResponse = await axios.get(product.image, { responseType: 'arraybuffer' });
        const uploadResponse = await strapi.plugins['upload'].services.upload.upload({
          data: {}, // Metadata
          files: {
            path: product.image,
            name: `product_${product.id}.jpg`,
            type: mediaResponse.headers['content-type'],
            size: mediaResponse.headers['content-length'],
          },
        });

        await strapi.entityService.create('api::product.product', {
          data: {
            id_integer: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            description: product.description,
            image: uploadResponse[0].id,
          },
        });

        console.log(`Product with id ${product.id} created.`);
      }

      console.log('Products fetched and stored.');
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  },
};

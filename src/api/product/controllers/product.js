'use strict';

module.exports = {
  async fetchProducts(ctx) {
    try {
      await strapi.service('api::product.product').fetchAndSaveProducts();
      ctx.send({ message: 'Products fetched successfully!' });
    } catch (error) {
      ctx.send('An error occurred while fetching products.', { error });
    }
  },

  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::product.product', ctx.query);
      ctx.body = entities;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.findOne('api::product.product', id, ctx.query);
      if (!entity) {
        ctx.throw(404, 'Product not found');
      }
      ctx.body = entity;
    } catch (error) {
      if (error.statusCode === 404) {
        ctx.throw(404, 'Product not found');
      } else {
        ctx.throw(500, 'Internal server error');
      }
    }
  },

  async create(ctx) {
    try {
      if (!ctx.request.body) {
        return ctx.throw(400, 'Please provide product data');
      }

      const product = await strapi.entityService.create('api::product.product', {
        data: ctx.request.body,
      });
      ctx.created(product);
    } catch (error) {
      ctx.throw(500, `An error occurred: ${error.message}`);
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    try {
      if (!ctx.request.body) {
        return ctx.throw(400, 'Please provide product data');
      }

      const existingProduct = await strapi.entityService.findOne('api::product.product', id);
      if (!existingProduct) {
        return ctx.throw(404, 'Product not found');
      }

      const updatedProduct = await strapi.entityService.update('api::product.product', id, {
        data: ctx.request.body,
      });
      ctx.body = updatedProduct;
    } catch (error) {
      ctx.throw(500, `An error occurred: ${error.message}`);
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;
    try {
      const product = await strapi.entityService.findOne('api::product.product', id);
      if (!product) {
        return ctx.throw(404, 'Product not found');
      }

      await strapi.entityService.delete('api::product.product', id);
      ctx.body = { message: 'Product successfully deleted' };
    } catch (error) {
      ctx.throw(500, 'An error occurred: ${error.message}');
    }
  }
};

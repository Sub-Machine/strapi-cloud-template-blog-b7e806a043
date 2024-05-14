module.exports = {
    // '0 0 * * *' means "At 00:00 (midnight) every day"
    '0 0 * * *': async () => {
      await strapi.services.product.fetchAndSaveProducts();
    }
  };
  
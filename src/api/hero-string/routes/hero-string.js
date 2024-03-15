'use strict';

/**
 * hero-string router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hero-string.hero-string');

'use strict';

/**
 * hero-string service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hero-string.hero-string');

/**
 * Central types export
 * Single source of truth for SHARED ecommerce types only
 * Feature-specific types should be imported from their respective feature/types
 */

// Product types (core domain - shared across features)
export * from './product.types';

// Order types (shared between checkout, orders, payments)
export * from './order.types';

// Common/shared types (used across all features)
export * from './common.types';

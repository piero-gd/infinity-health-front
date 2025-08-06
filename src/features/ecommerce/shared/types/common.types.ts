/**
 * Common types used across the ecommerce feature
 */

// API Response wrappers
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Error types
export interface ApiError {
    message: string;
    code?: string | number;
    field?: string;
}

// Loading states
export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

// Generic form validation
export interface ValidationError {
    field: string;
    message: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

// Currency and pricing
export interface Price {
    amount: number;
    currency: 'USD' | 'PEN';
    formatted: string;
}

// Image handling
export interface ImageMeta {
    width: number;
    height: number;
    alt?: string;
}

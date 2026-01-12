/**
 * Global Configuration
 * Reads from import.meta.env
 */

export const config = {
    // Base URL for API requests
    API_URL: import.meta.env.VITE_API_URL || '',

    // Current Environment
    ENV: import.meta.env.MODE,

    // Helper to check if dev
    isDev: import.meta.env.DEV,

    // Helper to check if production
    isProd: import.meta.env.PROD,
};

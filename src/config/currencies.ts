export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'] as const
export type Currency = typeof SUPPORTED_CURRENCIES[number]
export const DEFAULT_CURRENCY: Currency = 'USD'

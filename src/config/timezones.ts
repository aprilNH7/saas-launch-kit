export const TIMEZONE_LIST = Intl.supportedValuesOf?.('timeZone') ?? [
  'America/New_York', 'America/Chicago', 'America/Denver',
  'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu',
  'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'
]
export const DEFAULT_TIMEZONE = 'America/New_York'

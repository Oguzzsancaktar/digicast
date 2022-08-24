export const GENDER_TYPES = Object.freeze({
  FEMALE: 0,
  MALE: 1,
  OTHER: 2
})

export const NOTIFICATION_BEFORE_AFTER = Object.freeze({
  BEFORE: 0,
  AFTER: 1
})

export const STATUS_TYPES = Object.freeze({
  INACTIVE: 0,
  ACTIVE: 1
})

export const USER_ROLE_TYPES = Object.freeze({
  ADMIN: 1,
  USER: 0
})

export const ONE_YEAR_DATE = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // days, hours, minutes, seconds, milliseconds

export const AUTH_COOKIE_OPTIONS = {
  // httpOnly: process.env.NODE_ENV !== "production",
  // secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  expires: ONE_YEAR_DATE
}

export const STATUSES = [STATUS_TYPES.ACTIVE, STATUS_TYPES.INACTIVE]
export const GENDERS = [GENDER_TYPES.FEMALE, GENDER_TYPES.MALE, GENDER_TYPES.OTHER]

export const statusOptions = [
  { value: '-9', label: 'All' },
  { label: 'Inactive', value: '0' },
  { label: 'Active', value: '1' }
]

import { register } from 'timeago.js'

const customLocale = (
  _number: number,
  _index: number,
  totalSec?: number
): [string, string] => {
  if (!totalSec) {
    return ['-', '-']
  }

  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor(totalSec / 3600)
  const minutes = Math.floor(totalSec / 60)
  const seconds = Math.floor(totalSec % 60)

  if (days > 0) {
    return [`${days} day${days > 1 ? 's' : ''} ago`, '']
  } else if (hours > 0) {
    return [`${hours} hour${hours > 1 ? 's' : ''} ago`, '']
  } else if (minutes > 0) {
    return [
      `${minutes} min${minutes > 1 ? 's' : ''} and ${seconds} sec${seconds > 1 ? 's' : ''} ago`,
      '',
    ]
  } else {
    return [`${seconds} sec${seconds > 1 ? 's' : ''} ago`, '']
  }
}

// Register the custom locale with a unique name
register('custom-en', customLocale)

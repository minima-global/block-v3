import Decimal from 'decimal.js'

Decimal.set({ precision: 44 })

export function formatTxnAmount(amount?: number | null, full = false): string {
  if (!amount) {
    return ''
  }

  try {
    const amountAsDecimal = new Decimal(amount)

    if (full) {
      return amountAsDecimal
        .toFixed(44)
        .replace(/\.?0+$/, '')
        .toString()
    }

    const shortened = amountAsDecimal
      .toFixed(44)
      .toString()
      .replace(/\.?0+$/, '')
      .split('.')
    const decimal =
      shortened[1] && shortened[1].length > 8
        ? shortened[1].slice(0, 8)
        : shortened[1]

    return `${Number(shortened[0]).toLocaleString()}${decimal ? `.${decimal}` : '.00000'}`
  } catch (e) {
    return String(amount)
  }
}

export default formatTxnAmount

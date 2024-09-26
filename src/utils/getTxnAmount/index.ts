import Decimal from 'decimal.js'

export function getTxnAmount(body?: any) {
  if (!body) {
    return
  }

  Decimal.set({ precision: 44 })
  let decimal = new Decimal(0)

  const amount =
    body?.txn?.outputs &&
    Array.isArray(body.txn.outputs) &&
    body.txn.outputs
      .filter((i) => i.tokenid === '0x00')
      .forEach((i) => {
        decimal = decimal.add(i.amount)
      })

  try {
    const amount = decimal.toString()
    const parts = String(amount).split('.')
    return `${Number(parts[0]).toLocaleString()}${parts[1] ? `.${parts[1]}` : ''}`
  } catch {
    return amount
  }
}

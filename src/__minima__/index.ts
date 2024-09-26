import { Block, MDSResponse, TxPow } from '../types.ts'

// eslint-disable-next-line
const MDS = (window as any).MDS

export function block() {
  return new Promise((resolve, reject) => {
    MDS.cmd('block', function (response: MDSResponse<Block>) {
      if (response.status) {
        return resolve(response.response.block)
      }

      return reject()
    })
  })
}

export function txPowById(id: number | string): Promise<TxPow> {
  return new Promise((resolve, reject) => {
    MDS.cmd(`txpow txpowid:${id}`, function (response: MDSResponse<TxPow>) {
      if (response.status) {
        return resolve(response.response)
      }

      return reject()
    })
  })
}

export function txPow(id: number | string): Promise<TxPow> {
  return new Promise((resolve, reject) => {
    MDS.cmd(`txpow block:${id}`, function (response: MDSResponse<TxPow>) {
      if (response.status) {
        return resolve(response.response)
      }

      return reject()
    })
  })
}

export function txPowByAddress(address: string): Promise<TxPow | TxPow[]> {
  return new Promise((resolve, reject) => {
    MDS.cmd(
      `txpow address:${address}`,
      function (response: MDSResponse<TxPow | TxPow[]>) {
        if (response.status) {
          return resolve(response.response)
        }

        return reject()
      }
    )
  })
}

export function getManyTxPow(from: number, amount = 30): Promise<TxPow[]> {
  const promises: Promise<TxPow>[] = []

  for (let i = 0; i < amount; i++) {
    const block = from - i

    if (block > 0) {
      promises.push(txPow(block))
    }
  }

  return Promise.all(promises)
}

export function getManyTxPowFindOrFail(
  from: number,
  amount = 30
): Promise<PromiseSettledResult<TxPow>[]> {
  const promises: Promise<TxPow>[] = []

  for (let i = 0; i < amount; i++) {
    const block = from - i

    if (block > 0) {
      promises.push(txPow(block))
    }
  }

  return Promise.allSettled(promises)
}

export function history(offset = 0, max = 20): Promise<TxPow[]> {
  return new Promise((resolve, reject) => {
    MDS.cmd(
      `history action:list relevant:false max:${max} offset:${offset}`,
      function (response: MDSResponse<{ size: number; txpows: TxPow[] }>) {
        if (response.status) {
          return resolve(response.response.txpows)
        }

        return reject()
      }
    )
  })
}

export async function getLatestTransactions(): Promise<TxPow[]> {
  let loop = 0
  const maxLoop = 20
  const txPowIds: string[] = []
  const transactions: TxPow[] = []

  while (loop < maxLoop) {
    if (transactions.length >= 6) {
      break
    }

    const results = await history(loop * 20)

    results.forEach((row) => {
      if (
        row.istransaction &&
        transactions.length < 6 &&
        !txPowIds.includes(row.txpowid)
      ) {
        txPowIds.push(row.txpowid)
        transactions.push(row)
      }
    })

    loop += 1
  }

  return transactions
}

export async function getBlocks(
  topBlock: number,
  amount: number
): Promise<{ transactions: TxPow[] }> {
  const blocks = await getManyTxPow(topBlock, amount)

  return { transactions: blocks }
}

export async function getTransactions(
  amount = 10,
  offset = 0
): Promise<{ transactions: TxPow[]; count: number }> {
  let loop = 0
  const maxLoop = 20
  const txPowIds: string[] = []
  const transactions: TxPow[] = []
  let count = 0

  while (loop < maxLoop) {
    const results = await history(loop * 20 + offset)

    results.forEach((row) => {
      if (
        row.istransaction &&
        transactions.length < amount &&
        !txPowIds.includes(row.txpowid)
      ) {
        txPowIds.push(row.txpowid)
        transactions.push(row)
      }

      if (transactions.length < amount) {
        count += 1
      }
    })

    if (transactions.length >= amount) {
      break
    }

    loop += 1
  }

  return { transactions, count: count + 1 }
}

export async function checkTransactionConfirmation(
  id: number,
  txpowid: string
): Promise<
  | {
      block: string
      blockTxnId: string
      txnId: string
    }
  | undefined
> {
  return new Promise((resolve, reject) => {
    getManyTxPowFindOrFail(id + 10)
      .then((result) => {
        const txPowIds: { block: string; txnId: string; blockTxnId: string }[] =
          []

        result.forEach((row) => {
          if (row.status && row.status == 'fulfilled' && row?.value.isblock) {
            row.value.body.txnlist.forEach((txnId) =>
              txPowIds.push({
                block: row.value.header.block,
                blockTxnId: row.value.txpowid,
                txnId: txnId,
              })
            )
          }
        })

        resolve(txPowIds.find((i) => i.txnId === txpowid))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export async function getTxPowStats(
  timemilli?: number
): Promise<{ size: number; timemilli: number }> {
  return new Promise((resolve, reject) => {
    MDS.cmd(
      `history action:size relevant:false ${timemilli ? `startmilli:${timemilli}` : ''}`,
      function (response: MDSResponse<{ size: number; timemilli: number }>) {
        if (response.status) {
          return resolve(response.response)
        }

        return reject()
      }
    )
  })
}

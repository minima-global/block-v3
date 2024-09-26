export interface MDSResponse<T> {
  status: boolean
  response: T
}

export interface Block {
  block: string
  hash: string
  timemilli: string
  date: string
}

export interface TxPow {
  txpowid: string
  isblock: boolean
  istransaction: boolean
  superblock: number
  size: number
  burn: number
  header: Header
  hasbody: boolean
  body: Body
}

export interface Header {
  chainid: string
  block: string
  blkdiff: string
  cascadelevels: number
  superparents: Superparent[]
  magic: Magic
  mmr: string
  total: string
  customhash: string
  txbodyhash: string
  nonce: string
  timemilli: string
  date: string
}

export interface Superparent {
  difficulty: number
  count: number
  parent: string
}

export interface Magic {
  currentmaxtxpowsize: string
  currentmaxkissvmops: string
  currentmaxtxn: string
  currentmintxpowwork: string
  desiredmaxtxpowsize: string
  desiredmaxkissvmops: string
  desiredmaxtxn: string
  desiredmintxpowwork: string
}

export interface Body {
  prng: string
  txndiff: string
  txn: Txn
  witness: Witness
  burntxn: Burntxn
  burnwitness: Burnwitness
  txnlist: string[]
}

export interface Txn {
  inputs: Input[]
  outputs: Output[]
  state: State[]
  linkhash: string
  transactionid: string
}

export interface State {
  data: string
  port: number
  type: number
}

export interface Script {
  proof: {
    proof: string[]
    blocktime: string
    prooflength: string
  }
  script: string
  address: string
}

export interface Input {
  spent: boolean
  state: {
    data: string
    port: number
    type: number
  }[]
  token: string | null
  amount: string
  coinid: string
  address: string
  created: string
  tokenid: string
  mmrentry: string
  storestate: boolean
  miniaddress: string
}

export interface Output extends Input {}

export interface MMRProof {
  coin: {
    spent: boolean
    state: State[]
    token: string | null
    amount: string
    coinid: string
    address: string
    created: string
    tokenid: string
    mmrentry: string
    storestate: boolean
    miniaddress: string
  }
  proof: {
    proof: {
      data: {
        data: string
        value: string
      }
      left: boolean
    }[]
    blocktime: string
    prooflength: number
  }
}

export interface Signature {
  signatures: {
    rootkey: string
    publickey: string
    signature: string
    proof: {
      proof: {
        data: {
          data: string
          value: string
        }
        left: boolean
      }[]
    }
  }[]
}

export interface Witness {
  signatures: Signature[]
  mmrproofs: MMRProof[]
  scripts: Script[]
}

export interface Burntxn {
  inputs: Input[]
  outputs: Output[]
  state: State[]
  linkhash: string
  transactionid: string
}

export interface Burnwitness {
  signatures: Signature[]
  mmrproofs: MMRProof[]
  scripts: Script[]
}

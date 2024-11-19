import {
  createContext,
  useRef,
  useEffect,
  useState,
  SetStateAction,
} from 'react'
import getBlockCountForLast24Hours from './utils/getNumberOfBlocksInLastDay'

export const appContext = createContext<{
  topBlock: string | null
  totalSupply: string | null
  loaded: boolean
  hamburgerOpen: boolean
  transactionsInLast24Hours: number | null
  blocksInLast24Hours: number | null
  setHamburgerOpen: React.Dispatch<SetStateAction<boolean>>
}>({
  totalSupply: null,
  topBlock: null,
  loaded: false,
  hamburgerOpen: false,
  blocksInLast24Hours: 1720,
  transactionsInLast24Hours: null,
  setHamburgerOpen: () => null,
})

// eslint-disable-next-line
const MDS = (window as any).MDS


const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false)
  const [topBlock, setTopBlock] = useState<string | null>(null)
  const [totalSupply, setTotalSupply] = useState<string | null>(null)
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false)
  const [transactionsInLast24Hours, setTransactionsInLast24Hours] =
    useState(null)
  const [blocksInLast24Hours, setBlocksInLast24Hours] = useState<number | null>(null)

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true

      MDS.init((msg) => {
        if (msg.event === 'inited') {
          MDS.cmd('status', (res) => {
            setTopBlock(res.response.chain.block)
            setTotalSupply(Number(res.response.minima).toFixed(0))

            getBlockCountForLast24Hours(res.response.chain.block).then((blocks) => {
              setBlocksInLast24Hours(blocks)
            }).catch(() => {
              setBlocksInLast24Hours(1720)
            })
          })

          MDS.cmd('history action:transactions depth:1720', (res) => {
            setTransactionsInLast24Hours(res.response.transactions)
          })
        }

        if (msg.event === 'NEWBLOCK') {
          setTopBlock(msg.data.txpow.header.block)
        }
      })
    }
  }, [loaded])

  return (
    <appContext.Provider
      value={{
        topBlock,
        totalSupply,
        hamburgerOpen,
        setHamburgerOpen,
        transactionsInLast24Hours,
        loaded: loaded.current,
        blocksInLast24Hours,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export default AppProvider

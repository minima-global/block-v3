import {
  createContext,
  useRef,
  useEffect,
  useState,
  SetStateAction,
} from 'react'

export const appContext = createContext<{
  topBlock: string | null
  totalSupply: string | null
  loaded: boolean
  hamburgerOpen: boolean
  setHamburgerOpen: React.Dispatch<SetStateAction<boolean>>
}>({
  totalSupply: null,
  topBlock: null,
  loaded: false,
  hamburgerOpen: false,
  setHamburgerOpen: () => null,
})

// eslint-disable-next-line
const MDS = (window as any).MDS

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false)
  const [topBlock, setTopBlock] = useState<string | null>(null)
  const [totalSupply, setTotalSupply] = useState<string | null>(null)
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true

      MDS.init((msg) => {
        if (msg.event === 'inited') {
          MDS.cmd('status', (res) => {
            setTopBlock(res.response.chain.block)
            setTotalSupply(Number(res.response.minima).toFixed(0))
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
        loaded: loaded.current,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export default AppProvider

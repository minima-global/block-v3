import { useContext, useEffect, useRef, useState } from 'react'
import { appContext } from '../AppContext.tsx'
import { getTxPowStats } from '../__minima__'

function useNumberOfTxPows() {
  const fetched = useRef(false)
  const { loaded, topBlock } = useContext(appContext)
  const [isFetching, setIsFetching] = useState(true)
  const [last24Hours, setLast24Hours] = useState<number | null>(null)

  useEffect(() => {
    if (loaded && topBlock && !fetched.current) {
      fetched.current = true

      Promise.all([
        getTxPowStats(),
        // getTxPowStats(subDays(new Date(), 7).getTime()),
      ]).then(([responseOne]) => {
        setLast24Hours(responseOne.size)
        setIsFetching(false)
      })
    }
  }, [topBlock, loaded, fetched])

  return { isFetching, last24Hours }
}

export default useNumberOfTxPows

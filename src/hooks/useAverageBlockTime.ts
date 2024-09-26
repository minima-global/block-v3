import { useContext, useEffect, useState } from 'react'
import { appContext } from '../AppContext.tsx'
import { getBlocks } from '../__minima__'
import { averageSeconds } from '../utils/averageSeconds'

function useAverageBlockTime() {
  const { loaded, topBlock } = useContext(appContext)
  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<number | null>(null)

  useEffect(() => {
    if (loaded && !data && topBlock) {
      getBlocks(Number(topBlock), 250)
        .then((response) => {
          setData(
            averageSeconds(
              response.transactions.map((i) =>
                new Date(Number(i.header.timemilli)).getTime()
              )
            )
          )
          setIsFetching(false)
        })
        .catch(() => {
          setIsFetching(false)
        })
    }
  }, [data, topBlock, loaded])

  return { isFetching, data }
}

export default useAverageBlockTime

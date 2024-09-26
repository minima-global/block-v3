import ViewLink from './ViewLink'
import { format } from 'timeago.js'
import { formatDate } from 'date-fns'
import Tooltip from './Tooltip'
import { useContext, useEffect, useState } from 'react'
import { getManyTxPow } from '../__minima__'
import { appContext } from '../AppContext.tsx'
import { TxPow } from '../types.ts'
import { getTextSnippet } from '../utils'
import { Link } from '@tanstack/react-router'

const LatestBlocks = () => {
  const { topBlock } = useContext(appContext)
  const [isFetching, setIsFetching] = useState(true)
  const [data, setIsData] = useState<TxPow[]>([])

  useEffect(() => {
    if (topBlock) {
      getManyTxPow(Number(topBlock), 6)
        .then((response) => {
          setIsData(response)
          setIsFetching(false)
        })
        .catch(() => {
          setIsFetching(false)
        })
    }
  }, [topBlock])

  return (
    <div className="col-span-3 rounded bg-grey10 p-4 text-black lg:px-5 lg:py-6 dark:bg-darkContrast dark:text-grey20">
      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <h5 className="mb-5 text-xl">Latest Blocks</h5>
        </div>
        <div className="col-span-6 flex justify-end">
          <div className="hidden">
            <div className="dropdown relative rounded-2xl border border-grey40 bg-grey20 p-1.5 px-4 pb-1.5 text-sm dark:border-lightDarkContrast dark:bg-mediumDarkContrast">
              Customise
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid w-full grid-cols-12 rounded bg-grey20 p-3 px-4 text-sm dark:bg-mediumDarkContrast dark:text-grey80">
          <div className="col-span-4">Block / Time</div>
          <div className="col-span-8 flex justify-end lg:col-span-4 lg:justify-start">
            Hash
          </div>
          <div className="col-span-4 hidden justify-end text-right lg:flex">
            Transactions
          </div>
        </div>
        {isFetching &&
          new Array(6)
            .fill('X')
            .map((_i, index) => (
              <div
                key={`skeleton-${index}`}
                className="skele h-[62px] w-full rounded"
              />
            ))}
        {!isFetching &&
          data.map(({ txpowid, header, body, istransaction }) => (
            <Link
              key={txpowid}
              to={`/blocks/${txpowid}`}
              onClick={() => window.scrollTo(0, 0)}
              className="grid w-full grid-cols-12 rounded bg-white p-3 px-4 text-sm text-black transition-colors hover:bg-grey20 dark:bg-black dark:text-grey80 hover:dark:bg-mediumDarkContrast"
            >
              <div className="col-span-7 lg:col-span-4">
                <div className="mb-0.5 text-sm tabular-nums text-orange dark:text-lightOrange">
                  {header?.block}
                </div>
                <div className="relative">
                  <div className="hover cursor-pointer text-xs">
                    {format(new Date(Number(header.timemilli)), 'custom-en')}
                  </div>
                  <Tooltip
                    textContent={formatDate(
                      new Date(new Date(Number(header.timemilli))),
                      "HH:mm:ss @ do 'of' MMMM, yyyy"
                    )}
                  />
                </div>
              </div>
              <div className="col-span-5 flex items-center justify-end text-orange lg:col-span-4 lg:justify-start dark:text-lightOrange">
                <div className="relative block text-xs sm:text-sm lg:hidden">
                  {getTextSnippet(txpowid, 4, 10)}
                </div>
                <div className="relative hidden text-sm lg:block">
                  <div className="hover cursor-pointer">
                    {getTextSnippet(txpowid)}
                  </div>
                  <Tooltip textContent={txpowid} right={true} />
                </div>
              </div>
              <div className="col-span-4 hidden items-center justify-end lg:flex">
                {body.txnlist.length + (istransaction ? 1 : 0)}
              </div>
            </Link>
          ))}
      </div>
      <div className="mt-4 flex w-full items-center justify-end gap-3 lg:mt-6">
        <Link to="/blocks">
          <ViewLink label="View all blocks" />
        </Link>
      </div>
    </div>
  )
}

export default LatestBlocks

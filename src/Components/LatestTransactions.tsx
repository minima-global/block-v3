import ViewLink from './ViewLink'
import { format } from 'timeago.js'
import { formatDate } from 'date-fns'
import Tooltip from './Tooltip'
import { useContext, useEffect, useRef, useState } from 'react'
import { getLatestTransactions } from '../__minima__'
import { appContext } from '../AppContext.tsx'
import { TxPow } from '../types.ts'
import { formatTxnAmount, getTextSnippet } from '../utils'
import { Link } from '@tanstack/react-router'

const LatestTransctions = () => {
  const isPending = useRef<boolean>(false)
  const { topBlock, loaded } = useContext(appContext)
  const [isFetching, setIsFetching] = useState(true)
  const [data, setIsData] = useState<TxPow[]>([])

  useEffect(() => {
    if (topBlock && isFetching && !isPending.current) {
      isPending.current = true

      getLatestTransactions()
        .then((response) => {
          isPending.current = false
          setIsData(response)
          setIsFetching(false)
        })
        .catch(() => {
          isPending.current = false
          setIsFetching(false)
        })
    }
  }, [topBlock, isFetching, loaded])


  return (
    <div className="col-span-3 rounded bg-grey10 p-4 text-black lg:px-5 lg:py-6 dark:bg-darkContrast dark:text-grey20">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <h5 className="mb-5 text-xl">Latest Transactions</h5>
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
          data.map(({ txpowid, header, body, onChain }) => (
            <Link
              key={txpowid}
              to={`/transactions/${txpowid}`}
              onClick={() => window.scrollTo(0, 0)}
              className="grid w-full grid-cols-12 rounded bg-white p-3 px-4 text-sm text-black transition-colors hover:bg-grey20 dark:bg-black dark:text-grey80 hover:dark:bg-mediumDarkContrast"
            >
              <div className="col-span-7 lg:col-span-4">
                <div className="mb-0.5 text-sm tabular-nums text-orange dark:text-lightOrange">
                  {onChain ? onChain.block : header.block}
                </div>
                <div className="relative">
                  <div className="hover cursor-pointer text-xs">
                    {format(new Date(Number(header.timemilli)), 'custom-en')}
                  </div>
                  <Tooltip
                    textContent={formatDate(
                      new Date(Number(header.timemilli)),
                      "HH:mm:ss @ do 'of' MMMM, yyyy"
                    )}
                  />
                </div>
              </div>
              <div className="col-span-5 flex items-center justify-end text-orange lg:col-span-4 lg:justify-start dark:text-lightOrange">
                <div className="relative block text-xs sm:text-sm lg:hidden">
                  {getTextSnippet(txpowid, 4, 12)}
                </div>
                <div className="relative hidden text-sm lg:block">
                  <div className="hover cursor-pointer">
                    {getTextSnippet(txpowid)}
                  </div>
                  <Tooltip textContent={txpowid} />
                </div>
              </div>
              <div className="col-span-4 hidden items-center justify-end lg:flex">
                <div>
                  {[...body.txn.outputs.slice(0, 2)].map((output, index) => (
                    <div
                      key={`output-${output.amount}-1-${index}`}
                      className="relative block text-right text-xs tabular-nums"
                    >
                      <div className="hover cursor-pointer">
                        {formatTxnAmount(Number(output.amount))}
                      </div>
                      <Tooltip
                        textContent={formatTxnAmount(
                          Number(output.amount),
                          true
                        )}
                        right
                      />
                    </div>
                  ))}
                </div>
                {body.txn.outputs.length > 2 ? (
                  <div className="ml-4 flex items-center">
                    <div className="flex h-4 w-4 items-center justify-center rounded border border-grey80 dark:border-lightDarkContrast dark:bg-mediumDarkContrast">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 stroke-black dark:stroke-white"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Link>
          ))}
      </div>
      <div className="mt-4 flex w-full items-center justify-end gap-3 lg:mt-6">
        <Link to="/transactions">
          <ViewLink label="View all transactions" />
        </Link>
      </div>
    </div>
  )
}

export default LatestTransctions

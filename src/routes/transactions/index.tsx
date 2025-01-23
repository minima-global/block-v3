import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import { TxPow } from '../../types.ts'
import Section from '../../Components/Section.tsx'
import Title from '../../Components/Title.tsx'
import { formatDate } from 'date-fns'
import Search from '../../Components/Search.tsx'
import StatsCard from '../../Components/StatsCard.tsx'
import { formatTxnAmount, getTextSnippet } from '../../utils'
import Tooltip from '../../Components/Tooltip.tsx'
import { format } from 'timeago.js'
import { getTransactions } from '../../__minima__'
import PerPage from '../../Components/PerPage.tsx'
import Paginator from '../../Components/Paginator.tsx'
import { appContext } from '../../AppContext.tsx'

export const Route = createFileRoute('/transactions/')({
  component: Index,
})

const lastOffset = {}

function Index() {
  const [isFetching, setIsFetching] = useState(true)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<TxPow[]>([])
  const [perPage, setPerPage] = useState(10)
  const { loaded, transactionsInLast24Hours } = useContext(appContext)

  useEffect(() => {
    if (loaded) {
      getTransactions(perPage, lastOffset[page] || 0)
        .then((response) => {
          setData(response.transactions)
          lastOffset[page + 1] = response.count + (lastOffset[page] || 0)
          setIsFetching(false)
        })
    }
  }, [page, perPage, loaded])

  const DISPLAYED_STATS = [
    {
      id: 'txns_in_last_day',
      icon: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black dark:fill-white"
        >
          <path d="M9 19.7115L0.25 14.8557V5.1442L9 0.288452L17.75 5.1442V14.8557L9 19.7115ZM6.148 7.5577C6.51217 7.14487 6.941 6.8237 7.4345 6.5942C7.92817 6.3647 8.45 6.24995 9 6.24995C9.55 6.24995 10.0718 6.3647 10.5655 6.5942C11.059 6.8237 11.4878 7.14487 11.852 7.5577L15.4098 5.57495L9 2.01145L2.59025 5.57495L6.148 7.5577ZM8.25 17.573V13.6827C7.36917 13.4877 6.649 13.048 6.0895 12.3635C5.52983 11.6788 5.25 10.891 5.25 9.99995C5.25 9.79745 5.26317 9.60737 5.2895 9.4297C5.31567 9.2522 5.36017 9.07045 5.423 8.88445L1.75 6.82695V13.9692L8.25 17.573ZM9 12.25C9.627 12.25 10.1588 12.0317 10.5953 11.5952C11.0317 11.1587 11.25 10.627 11.25 9.99995C11.25 9.37295 11.0317 8.8412 10.5953 8.4047C10.1588 7.9682 9.627 7.74995 9 7.74995C8.373 7.74995 7.84125 7.9682 7.40475 8.4047C6.96825 8.8412 6.75 9.37295 6.75 9.99995C6.75 10.627 6.96825 11.1587 7.40475 11.5952C7.84125 12.0317 8.373 12.25 9 12.25ZM9.75 17.573L16.25 13.9692V6.82695L12.577 8.88445C12.6398 9.07045 12.6843 9.2522 12.7105 9.4297C12.7368 9.60737 12.75 9.79745 12.75 9.99995C12.75 10.891 12.4702 11.6788 11.9105 12.3635C11.351 13.048 10.6308 13.4877 9.75 13.6827V17.573Z" />
        </svg>
      ),
      title: 'Transactions in the last day',
      value: transactionsInLast24Hours,
      isLoading: false,
    },
    // {
    //   id: 'txns_in_last_week',
    //   icon: (
    //     <svg
    //       width="18"
    //       height="20"
    //       viewBox="0 0 18 20"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="fill-black dark:fill-white"
    //     >
    //       <path d="M9 19.5C8.83583 19.5 8.68008 19.4782 8.53275 19.4345C8.38525 19.391 8.24617 19.3308 8.1155 19.2538L1.38475 15.3635C1.10008 15.1993 0.8815 14.9808 0.729 14.7078C0.576333 14.4346 0.5 14.1371 0.5 13.8152V6.18475C0.5 5.86292 0.576333 5.56542 0.729 5.29225C0.8815 5.01925 1.10008 4.80067 1.38475 4.6365L8.1155 0.746249C8.24617 0.669249 8.38525 0.609 8.53275 0.5655C8.68008 0.521833 8.83583 0.5 9 0.5C9.15767 0.5 9.31025 0.521833 9.45775 0.5655C9.60508 0.609 9.74733 0.669249 9.8845 0.746249L16.6152 4.6365C16.8936 4.80067 17.1106 5.01925 17.2663 5.29225C17.4221 5.56542 17.5 5.86292 17.5 6.18475V13.8152C17.5 14.1371 17.4221 14.4346 17.2663 14.7078C17.1106 14.9808 16.8936 15.1993 16.6152 15.3635L9.8845 19.2538C9.74733 19.3308 9.60508 19.391 9.45775 19.4345C9.31025 19.4782 9.15767 19.5 9 19.5ZM5.3365 13.673V10.75H2V13.7962C2 13.8474 2.01283 13.8955 2.0385 13.9405C2.06417 13.9853 2.10258 14.0238 2.15375 14.0557L8.25 17.6077V13.673H5.3365ZM5.3365 6.327H8.25V2.39225L2.15375 5.94425C2.10258 5.97625 2.06417 6.01467 2.0385 6.0595C2.01283 6.1045 2 6.15258 2 6.20375V9.25H5.3365V6.327ZM6.8365 12.173H11.1538V7.8365H6.8365V12.173ZM12.6538 13.673H9.75V17.6077L15.8462 14.0557C15.8974 14.0238 15.9358 13.9853 15.9615 13.9405C15.9872 13.8955 16 13.8474 16 13.7962V10.75H12.6538V13.673ZM12.6538 6.327V9.25H16V6.20375C16 6.15258 15.9872 6.1045 15.9615 6.0595C15.9358 6.01467 15.8974 5.97625 15.8462 5.94425L9.75 2.39225V6.327H12.6538Z" />
    //     </svg>
    //   ),
    //   title: 'Transactions in the last week',
    //   value: 'X',
    //   isLoading: false,
    // },
  ]

  const columnClassNames = {
    1: 'col-span-12 md:col-span-8 lg:col-span-5 xl:col-span-7 2xl:col-span-8',
    2: 'hidden md:col-span-5 md:flex lg:col-span-2 lg:hidden xl:col-span-2 xl:flex 2xl:col-span-2',
    3: 'hidden md:col-span-5 md:flex lg:col-span-3 xl:col-span-3 2xl:col-span-2',
    4: 'hidden lg:col-span-6 lg:flex xl:col-span-4 2xl:col-span-4',
    5: 'hidden lg:col-span-2 lg:flex xl:col-span-1 2xl:col-span-2',
    6: 'hidden lg:col-span-6 lg:flex xl:col-span-4 2xl:col-span-4',
    7: 'col-span-12 flex md:col-span-6 md:flex lg:col-span-2 xl:col-span-3 2xl:col-span-2',
  }
  const colourColumnHeaderClassNames = {
    1: 'text-orange dark:text-lightOrange',
    2: '',
    3: 'xs:text-orange xs:dark:text-lightOrange md:text-orange md:dark:text-lightOrange lg:text-black lg:dark:text-grey80 xl:text-orange xl:dark:text-lightOrange xl:text-orange xl:dark:text-lightOrange',
    4: 'lg:text-orange lg:dark:text-lightOrange xl:text-black xl:dark:text-grey80',
    5: '',
    6: 'lg:text-black lg:dark:text-grey80 xl:text-orange xl:dark:text-lightOrange',
    7: 'lg:text-orange lg:dark:text-lightOrange xl:text-black xl:dark:text-grey80',
  }
  const colourColumnBodyClassNames = {
    1: '',
    2: 'md:text-orange md:dark:text-lightOrange',
    3: 'lg:text-orange lg:dark:text-lightOrange xl:text-black xl:dark:text-grey20',
    4: 'xl:text-orange xl:dark:text-lightOrange',
    5: '',
    6: 'lg:text-orange lg:dark:text-lightOrange xl:text-black xl:dark:text-grey20',
    7: 'text-orange dark:text-lightOrange',
  }

  return (
    <div>
      <div
        className={`${page === 1 ? 'visible scale-100 pb-0' : 'invisible h-0 scale-0 pb-5 lg:pb-14'}`}
      >
        <Title title="Transactions" />
        <Section className="-mt-6 lg:-mt-8">
          <div className="mb-5 grid grid-cols-12 gap-3 lg:mb-10 lg:gap-6">
            {DISPLAYED_STATS.map((stats) => (
              <StatsCard key={stats.title} {...stats} span={12} />
            ))}
          </div>
        </Section>
      </div>
      <Section>
        <div className="mb-8 mt-6 grid grid-cols-12 lg:mt-0">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-2xl dark:text-white -mt-2">
              Latest transactions
            </h2>
          </div>
          <div className="col-span-12 flex justify-end lg:col-span-6">
            <div className="mt-7 w-full lg:mt-0 lg:max-w-[400px]">
              <Search />
            </div>
          </div>
        </div>
      </Section>
      <Section className="mb-12">
        <div className="mb-8 flex flex-col gap-3">
          <div className="grid w-full grid-cols-24 rounded bg-grey20 p-3 px-4 text-sm text-black dark:bg-mediumDarkContrast dark:text-grey80">
            <div
              className={`${columnClassNames[1]} ${colourColumnHeaderClassNames[1]}`}
            >
              Txn ID / Time
            </div>
            <div
              className={`${columnClassNames[2]} ${colourColumnHeaderClassNames[2]}`}
            >
              Token ID
            </div>
            <div
              className={`${columnClassNames[3]} ${colourColumnHeaderClassNames[3]}`}
            >
              Block
            </div>
            <div
              className={`${columnClassNames[4]} ${colourColumnHeaderClassNames[4]}`}
            >
              Inputs
            </div>
            <div className={`${columnClassNames[5]}`}></div>
            <div
              className={`${columnClassNames[6]} ${colourColumnHeaderClassNames[6]}`}
            >
              Outputs
            </div>
            <div
              className={`${columnClassNames[7]} ${colourColumnHeaderClassNames[7]} justify-end text-right`}
            >
              Output amount
            </div>
          </div>
          {isFetching &&
            new Array(10)
              .fill('X')
              .map((_i, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="skele h-[60px] w-full rounded"
                />
              ))}
          {!isFetching && (data?.length === 0 || !data) && (
            <div className="grid w-full grid-cols-24 rounded bg-grey10 p-3 px-4 text-sm transition-colors hover:bg-grey20 dark:bg-darkContrast dark:text-grey20 hover:dark:bg-mediumDarkContrast">
              <div
                className={`${columnClassNames[1]} ${colourColumnBodyClassNames[1]}`}
              >
                <div>There are no more transactions that can be loaded</div>
              </div>
            </div>
          )}
          {!isFetching &&
            data?.map(({ txpowid, header, body, onChain }) => (
              <Link
                key={txpowid}
                to={`/transactions/${txpowid}`}
                onClick={() => window.scrollTo(0, 0)}
                className="grid w-full grid-cols-24 rounded bg-grey10 p-3 px-4 text-sm transition-colors hover:bg-grey20 dark:bg-darkContrast dark:text-grey20 hover:dark:bg-mediumDarkContrast"
              >
                <div
                  className={`${columnClassNames[1]} ${colourColumnBodyClassNames[1]}`}
                >
                  <div>
                    <div className="mb-0.5 block text-sm text-orange dark:text-lightOrange">
                      <div className="hover cursor-pointer">
                        <span className="hidden 2xl:block">
                          {getTextSnippet(txpowid, 8, 36)}
                        </span>
                        <span className="hidden xl:block 2xl:hidden">
                          {getTextSnippet(txpowid, 8, 24)}
                        </span>
                        <span className="block xl:hidden">
                          {getTextSnippet(txpowid)}
                        </span>
                      </div>
                      <Tooltip textContent={txpowid} />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="hover flex cursor-pointer gap-3 text-xs">
                      {format(new Date(Number(header.timemilli)), 'custom-en')}
                      <span className="hidden 2xl:block">-</span>
                      <span className="hidden text-lightDarkContrast 2xl:block dark:text-grey80">
                        {formatDate(
                          new Date(Number(header.timemilli)),
                          "h:mm:ss a @ do 'of' MMM, yyyy"
                        )}
                      </span>
                    </div>
                    <div className="tooltip overflow absolute mt-1.5 hidden w-max rounded border-darkContrast bg-mediumDarkContrast px-2 py-0.5 text-white opacity-0 shadow lg:block">
                      {formatDate(
                        new Date(Number(header.timemilli)),
                        "h:mm a @ do 'of' MMMM, yyyy"
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${columnClassNames[2]} ${colourColumnBodyClassNames[2]} items-center`}
                >
                  0x00
                </div>
                <div
                  className={`${columnClassNames[3]} ${colourColumnBodyClassNames[3]} items-center tabular-nums lg:flex`}
                >
                  {onChain ? onChain.block : header.block}
                </div>
                <div
                  className={`${columnClassNames[4]} ${colourColumnBodyClassNames[4]} items-center`}
                >
                  <div className="flex flex-col">
                    {[...body.txn.inputs.slice(0, 2)].map((input, index) => (
                      <div key={`input-${input.address}-${input.amount}-1-${index}`} className="relative">
                        <div className="hover cursor-pointer">
                          {getTextSnippet(input.address)}
                        </div>
                        <Tooltip textContent={input.address} />
                      </div>
                    ))}
                  </div>
                  <div className="ml-4 flex items-center">
                    {body.txn.inputs.length > 2 ? (
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
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className={`${columnClassNames[5]} items-center`}>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="dark:fill-grey20"
                  >
                    <mask
                      id="mask0_2918_8264"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="21"
                    >
                      <rect y="0.5" width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_2918_8264)">
                      <path d="M5 15.5L8.58333 10.5L5 5.5H7L10.5833 10.5L7 15.5H5ZM9.41667 15.5L13 10.5L9.41667 5.5H11.4375L15 10.5L11.4375 15.5H9.41667Z" />
                    </g>
                  </svg>
                </div>
                <div
                  className={`${columnClassNames[6]} ${colourColumnBodyClassNames[6]} items-center`}
                >
                  <div className="flex">
                    <div className="flex flex-col">
                      {[...body.txn.outputs.slice(0, 2)].map((output, index) => (
                        <div key={`output-${output.address}-${output.amount}-1-${index}`} className="relative">
                          <div className="hover cursor-pointer">
                            {getTextSnippet(output.address)}
                          </div>
                          <Tooltip textContent={output.address} right />
                        </div>
                      ))}
                    </div>
                    <div className="ml-4 flex items-center">
                      {body.txn.outputs.length > 2 ? (
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
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${columnClassNames[7]} ${colourColumnBodyClassNames[7]} items-center justify-end tabular-nums`}
                >
                  <div>
                    {[...body.txn.outputs.slice(0, 2)].map((output, index) => (
                      <div
                        key={`output-${output.address}-${output.amount}-2-${index}`}
                        className="relative block text-right"
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
        {!isFetching && (
          <div className="grid grid-cols-2 text-black dark:text-grey80">
            <div className="col-span-1 hidden lg:block">
              <PerPage
                perPage={perPage}
                setPerPage={(perPage) => {
                  setIsFetching(true)
                  setPerPage(perPage)
                }}
              />
            </div>
            <div className="col-span-2 flex items-center justify-center gap-4 lg:col-span-1 lg:justify-end">
              <Paginator
                page={page}
                disableNext={data && data.length < perPage}
                setPage={(page) => {
                  setIsFetching(true)
                  setPage(page)
                }}
              />
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}

export default Index

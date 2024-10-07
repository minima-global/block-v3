import { createFileRoute, Link } from '@tanstack/react-router'
import Title from '../../Components/Title.tsx'
import Search from '../../Components/Search.tsx'
import Section from '../../Components/Section.tsx'
import { useContext, useEffect, useState } from 'react'
import { getManyTxPow } from '../../__minima__'
import { appContext } from '../../AppContext.tsx'
import { getTextSnippet } from '../../utils'
import Tooltip from '../../Components/Tooltip.tsx'
import { formatDate } from 'date-fns'
import { format } from 'timeago.js'
import PerPage from '../../Components/PerPage.tsx'
import Paginator from '../../Components/Paginator.tsx'
import { TxPow } from '../../types.ts'
import StatsCard from '../../Components/StatsCard.tsx'

export const Route = createFileRoute('/blocks/')({
  component: Index,
})

function Index() {
  const { topBlock } = useContext(appContext)
  const [isFetching, setIsFetching] = useState(true)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<TxPow[]>([])
  const [perPage, setPerPage] = useState(10)

  const columnsClassNames = {
    1: 'col-span-12 lg:col-span-4 xl:col-span-4 2xl:col-span-6',
    2: 'col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-9',
    3: 'hidden lg:block lg:col-span-3 xl:col-span-2 2xl:col-span-3',
    4: 'hidden lg:block lg:col-span-2 xl:col-span-3 2xl:col-span-3',
    5: 'hidden lg:block lg:col-span-3 xl:col-span-3 2xl:col-span-3',
  }

  useEffect(() => {
    if (topBlock) {
      const offset = perPage * (page - 1)

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })

      getManyTxPow(Number(topBlock) - offset, perPage)
        .then((response) => {
          setData(response)
          setIsFetching(false)
        })
        .catch(() => {
          setIsFetching(false)
        })
    }
  }, [topBlock, page, perPage])

  const DISPLAYED_STATS = [
    {
      id: 'block_height',
      icon: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black dark:fill-white"
        >
          <path d="M8.25 17.5692V10.4307L2 6.81147V13.777C2 13.8281 2.01283 13.8762 2.0385 13.9212C2.06417 13.9661 2.10258 14.0045 2.15375 14.0365L8.25 17.5692ZM9.75 17.5692L15.8462 14.0365C15.8974 14.0045 15.9358 13.9661 15.9615 13.9212C15.9872 13.8762 16 13.8281 16 13.777V6.81147L9.75 10.4307V17.5692ZM9 9.13847L15.175 5.56922L9.15375 2.08647C9.10258 2.05447 9.05133 2.03847 9 2.03847C8.94867 2.03847 8.89742 2.05447 8.84625 2.08647L2.825 5.56922L9 9.13847ZM1.404 15.3537C1.11933 15.1897 0.8975 14.9706 0.7385 14.6962C0.5795 14.4217 0.5 14.1204 0.5 13.7922V6.20772C0.5 5.87956 0.5795 5.57822 0.7385 5.30372C0.8975 5.02939 1.11933 4.81022 1.404 4.64622L8.09625 0.794225C8.38075 0.630058 8.682 0.547974 9 0.547974C9.318 0.547974 9.61925 0.630058 9.90375 0.794225L16.596 4.64622C16.8807 4.81022 17.1025 5.02939 17.2615 5.30372C17.4205 5.57822 17.5 5.87956 17.5 6.20772V13.7922C17.5 14.1204 17.4205 14.4217 17.2615 14.6962C17.1025 14.9706 16.8807 15.1897 16.596 15.3537L9.90375 19.2057C9.61925 19.3699 9.318 19.452 9 19.452C8.682 19.452 8.38075 19.3699 8.09625 19.2057L1.404 15.3537Z" />
        </svg>
      ),
      title: 'Block height',
      value: topBlock,
    },
    {
      id: 'average_block_difficulty',
      icon: (
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black dark:fill-white"
        >
          <path d="M8.84625 2.08647L2.825 5.56922L9 9.13847L15.175 5.56922L9.15375 2.08647C9.10258 2.05447 9.05133 2.03847 9 2.03847C8.94867 2.03847 8.89742 2.05447 8.84625 2.08647ZM0.5 13.7922V6.20772C0.5 5.87956 0.579083 5.57897 0.73725 5.30597C0.895417 5.03297 1.11767 4.81306 1.404 4.64622L8.09625 0.794225C8.25008 0.710891 8.398 0.649057 8.54 0.608723C8.682 0.568223 8.83517 0.547974 8.9995 0.547974C9.164 0.547974 9.3215 0.568223 9.472 0.608723C9.62267 0.649057 9.76658 0.710891 9.90375 0.794225L16.596 4.64622C16.8823 4.81306 17.1046 5.03297 17.2628 5.30597C17.4209 5.57897 17.5 5.87956 17.5 6.20772V9.92298H16V6.81148L8.975 10.8615L2 6.81148V13.777C2 13.8281 2.01283 13.8762 2.0385 13.9212C2.06417 13.9661 2.10258 14.0045 2.15375 14.0365L8.30775 17.6077V19.321L1.404 15.3537C1.11767 15.1869 0.895417 14.967 0.73725 14.694C0.579083 14.421 0.5 14.1204 0.5 13.7922ZM15 19.6635C15.1333 19.6635 15.2468 19.6166 15.3405 19.523C15.434 19.4295 15.4808 19.3161 15.4808 19.1827C15.4808 19.0494 15.434 18.9359 15.3405 18.8422C15.2468 18.7487 15.1333 18.702 15 18.702C14.8667 18.702 14.7532 18.7487 14.6595 18.8422C14.566 18.9359 14.5193 19.0494 14.5193 19.1827C14.5193 19.3161 14.566 19.4295 14.6595 19.523C14.7532 19.6166 14.8667 19.6635 15 19.6635ZM14.5577 17.702H15.4423V14.0865H14.5577V17.702ZM15 21.375C13.7513 21.375 12.6892 20.9371 11.8135 20.0615C10.9378 19.1858 10.5 18.1236 10.5 16.875C10.5 15.6263 10.9378 14.5641 11.8135 13.6885C12.6892 12.8128 13.7513 12.375 15 12.375C16.2487 12.375 17.3108 12.8128 18.1865 13.6885C19.0622 14.5641 19.5 15.6263 19.5 16.875C19.5 18.1236 19.0622 19.1858 18.1865 20.0615C17.3108 20.9371 16.2487 21.375 15 21.375Z" />
        </svg>
      ),
      title: 'Number of blocks in the last day',
      value: `1720 Blocks`,
    },
    {
      id: 'average_block_time',
      icon: (
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black dark:fill-white"
        >
          <path d="M15.4423 16.7267V13.9615H14.5577V17.0845L16.65 19.177L17.273 18.5537L15.4423 16.7267ZM8.84625 2.08647L2.825 5.56922L9 9.13847L15.175 5.56922L9.15375 2.08647C9.10258 2.05447 9.05133 2.03847 9 2.03847C8.94867 2.03847 8.89742 2.05447 8.84625 2.08647ZM0.5 13.7922V6.20772C0.5 5.87956 0.579083 5.57897 0.73725 5.30597C0.895417 5.03297 1.11767 4.81306 1.404 4.64622L8.09625 0.794225C8.25008 0.710891 8.398 0.649057 8.54 0.608723C8.682 0.568223 8.83517 0.547974 8.9995 0.547974C9.164 0.547974 9.3215 0.568223 9.472 0.608723C9.62267 0.649057 9.76658 0.710891 9.90375 0.794225L16.596 4.64622C16.8823 4.81306 17.1046 5.03297 17.2628 5.30597C17.4209 5.57897 17.5 5.87956 17.5 6.20772V9.92298H16V6.81148L8.975 10.8615L2 6.81148V13.777C2 13.8281 2.01283 13.8762 2.0385 13.9212C2.06417 13.9661 2.10258 14.0045 2.15375 14.0365L8.30775 17.6077V19.321L1.404 15.3537C1.11767 15.1869 0.895417 14.967 0.73725 14.694C0.579083 14.421 0.5 14.1204 0.5 13.7922ZM15 21.375C13.7513 21.375 12.6892 20.9371 11.8135 20.0615C10.9378 19.1858 10.5 18.1236 10.5 16.875C10.5 15.6263 10.9378 14.5641 11.8135 13.6885C12.6892 12.8128 13.7513 12.375 15 12.375C16.2487 12.375 17.3108 12.8128 18.1865 13.6885C19.0622 14.5641 19.5 15.6263 19.5 16.875C19.5 18.1236 19.0622 19.1858 18.1865 20.0615C17.3108 20.9371 16.2487 21.375 15 21.375Z" />
        </svg>
      ),
      title: 'Average block time',
      value: `50 seconds`,
      isLoading: false,
    },
  ]

  return (
    <div>
      <div
        className={`${page === 1 ? 'visible scale-100 pb-0' : 'invisible h-0 scale-0 pb-5 lg:pb-14'}`}
      >
        <Title title="Blocks" />
        <Section className="-mt-6 lg:-mt-8">
          <div className="mb-5 grid grid-cols-12 gap-3 lg:mb-10 lg:gap-6">
            {DISPLAYED_STATS.map((stats) => (
              <StatsCard key={stats.id} {...stats} />
            ))}
          </div>
        </Section>
      </div>
      <Section>
        <div className="mb-8 grid grid-cols-12">
          <div className="col-span-12 mt-4 lg:col-span-6 lg:mt-0 flex items-center">
            <h2 className="text-2xl dark:text-white -mt-2">Latest blocks</h2>
          </div>
          <div className="col-span-12 flex justify-end lg:col-span-6">
            <div className="mt-7 w-full lg:mt-0 lg:max-w-[400px]">
              <Search />
            </div>
          </div>
        </div>
      </Section>
      <Section className="mb-12 w-full">
        <div className="mb-8 flex flex-col gap-3">
          <div className="grid w-full grid-cols-24 rounded bg-grey20 p-3 px-4 text-sm text-black dark:bg-mediumDarkContrast dark:text-grey80">
            <div
              className={`${columnsClassNames[1]} text-orange dark:text-lightOrange`}
            >
              Block / Time
            </div>
            <div
              className={`${columnsClassNames[2]} flex justify-end lg:justify-start`}
            >
              Hash / Txn TxPoW
            </div>
            <div className={`${columnsClassNames[3]}`} />
            <div
              className={`${columnsClassNames[4]} hidden text-orange lg:block dark:text-lightOrange`}
            >
              Txns
            </div>
            <div
              className={`${columnsClassNames[5]} hidden justify-end text-right lg:flex`}
            >
              Superblock level
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
          {!isFetching && data.length === 0 && (
            <>
              <div className="grid w-full grid-cols-24 rounded bg-grey10 p-3 px-4 text-sm transition-colors hover:bg-grey20 dark:bg-darkContrast dark:text-grey20 hover:dark:bg-mediumDarkContrast">
                <div className={`${columnsClassNames[1]}`}>
                  <div className="mb-0.5 px-2 py-2 text-sm tabular-nums text-black dark:text-white">
                    The data could not be retrieved, please go back
                  </div>
                </div>
              </div>
              {new Array(9).fill('X').map((_i, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="skele skele--no-animation h-[60px] w-full rounded"
                />
              ))}
            </>
          )}
          {!isFetching &&
            data.length > 0 &&
            data.map((txpow) => {
              const block = txpow.header.block
              const dateTime = new Date(Number(txpow.header.timemilli))
              const txpow_id = txpow.txpowid
              const number_of_transactions =
                txpow.body.txnlist.length + (txpow.istransaction ? 1 : 0)
              const superblock_level = txpow.superblock

              return (
                <Link
                  to={`/blocks/${txpow_id}`}
                  key={txpow_id}
                  className="grid w-full grid-cols-24 rounded bg-grey10 p-3 px-4 text-sm transition-colors hover:bg-grey20 dark:bg-darkContrast dark:text-grey20 hover:dark:bg-mediumDarkContrast"
                >
                  <div className={`${columnsClassNames[1]}`}>
                    <div className="mb-0.5 text-sm tabular-nums text-orange dark:text-lightOrange">
                      {block}
                    </div>
                    <div className="relative">
                      <div className="hover flex cursor-pointer gap-2 text-xs">
                        {format(dateTime, 'custom-en') || ''}
                        <span className="hidden 2xl:block">-</span>
                        <span className="hidden text-gray-500 dark:text-gray-400 2xl:block">
                          {formatDate(
                            dateTime,
                            "h:mm:ss a @ do 'of' MMM, yyyy"
                          )}
                        </span>
                      </div>
                      <Tooltip
                        textContent={formatDate(
                          dateTime,
                          "h:mm:ss @ do 'of' MMMM, yyyy"
                        )}
                      />
                    </div>
                  </div>

                  <div
                    className={`${columnsClassNames[2]} flex items-center justify-end text-orange lg:flex lg:justify-start dark:text-lightOrange`}
                  >
                    <div className="hidden lg:block">{txpow_id}</div>
                    <div className="block lg:hidden">
                      <div className="hidden sm:block">
                        {getTextSnippet(txpow_id, 18, 24)}
                      </div>
                      <div className="block sm:hidden">
                        {getTextSnippet(txpow_id, 4, 10)}
                      </div>
                      <div className="relative hidden text-sm lg:block">
                        <div className="hover cursor-pointer">
                          {getTextSnippet(txpow_id)}
                        </div>
                        <div className="tooltip overflow absolute mt-1.5 w-max rounded border-darkContrast bg-mediumDarkContrast px-2 py-0.5 text-xs text-white opacity-0 shadow">
                          {txpow_id}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={columnsClassNames[3]} />

                  <div
                    className={`${columnsClassNames[4]} hidden items-center lg:flex`}
                  >
                    {number_of_transactions}
                  </div>

                  <div
                    className={`${columnsClassNames[5]} hidden items-center justify-end text-orange lg:flex dark:text-lightOrange`}
                  >
                    {superblock_level}
                  </div>
                </Link>
              )
            })}
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

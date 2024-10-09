import { createFileRoute, Link } from '@tanstack/react-router'
import Title from '../Components/Title.tsx'
import Section from '../Components/Section.tsx'
import {useContext, useEffect, useState} from 'react'
import ArrowBack from '../Components/ArrowBack.tsx'
import { default as SearchInput } from '../Components/Search.tsx'
import { z } from 'zod'
import { txPow, txPowByAddress, txPowById } from '../__minima__'
import { formatDate } from 'date-fns'
import { getTextSnippet } from '../utils'
import { TxPow } from '../types.ts'
import {appContext} from "../AppContext.tsx";

const searchSchema = z.object({
  q: z.string().or(z.number()),
})

export const Route = createFileRoute('/search')({
  component: Search,
  validateSearch: searchSchema,
})

function Search() {
  const { loaded } = useContext(appContext);
  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<TxPow | null>(null)
  const { q } = Route.useSearch()

  useEffect(() => {
    if (loaded) {
        const currentQRef = String(q);

        setIsFetching(true)

        if (currentQRef && currentQRef.includes('0x') || currentQRef && currentQRef.includes('Mx')) {
            txPowById(currentQRef)
                .then((response) => {
                    setData(response)
                    setIsFetching(false)
                })
                .catch(() => {
                    txPowByAddress(currentQRef)
                        .then((response) => {
                            // search by address is returned as an array so only
                            // set search results if the array count is higher than 0
                            if (Array.isArray(response)) {
                                setData(response[0])
                                setIsFetching(false)
                            } else {
                                setData(null)
                                setIsFetching(false)
                            }
                        })
                        .catch(() => {
                            setData(null)
                            setIsFetching(false)
                        })
                })
        } else {
            txPow(currentQRef)
                .then((response) => {
                    setData(response)
                    setIsFetching(false)
                })
                .catch(() => {
                    setData(null)
                    setIsFetching(false)
                })
        }
    }
  }, [q, loaded])

  return (
    <div>
      <Section className="mt-10 lg:mt-14">
        <Link to="/" className="flex items-center gap-4 dark:text-white">
          <ArrowBack />
          Back
        </Link>
      </Section>
      <Title title="Search" />
      <Section className="-mt-6 lg:-mt-8">
        <div className="mb-8 flex w-full items-center justify-start">
          <div className="w-full lg:max-w-[900px] mx-auto">
            <SearchInput sizing="large" exisitingValue={String(q)} />
          </div>
        </div>
      </Section>
      <Section className="mt-20 mb-20">
        <div className="flex flex-col gap-4">
          {isFetching &&
            new Array(5)
              .fill('X')
              .map((_i, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="skele h-[90px] w-full rounded"
                />
              ))}
          {!isFetching && (
            <>
              <div className="mb-4 flex flex-col gap-4">
                {!data && (
                  <div
                    className={`bg-grey10 text-black dark:text-white dark:bg-darkContrast col-span-3 rounded p-6`}
                  >
                    <h5 className="text-md mb-4 break-all lg:text-lg">
                      Your search: <span className="font-bold">{q}</span> - did
                      not match any records.
                    </h5>{' '}
                    <div className="lg:text-md text-sm dark:text-grey80">
                      <div className="mb-4">Suggestions:</div>
                      <ul className="ml-5 list-disc">
                        <li>Make sure that all words are spelled correctly.</li>{' '}
                        <li>Try different keywords.</li>
                        <li> Try more general keywords.</li>
                      </ul>
                    </div>
                  </div>
                )}
                {data && !Array.isArray(data) && (
                  <>
                    {!data.istransaction && (
                      <Link to={`/blocks/${data.txpowid}`}>
                        <div
                          className={`bg-grey10 dark:bg-darkContrast hover:bg-grey20 dark:hover:bg-mediumDarkContrast ${`col-span-${3}`} rounded`}
                        >
                          <div className="h-fit p-4 lg:p-6">
                            <div className="flex gap-4">
                              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-md bg-white dark:bg-mediumDarkContrast">
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
                              </div>
                              <div>
                                <div className="-mt-1 mb-1 text-sm text-black dark:text-grey20">
                                  Block -{' '}
                                  <span className="text-xs text-darkContrast dark:text-grey80">
                                    {formatDate(
                                      new Date(Number(data.header.timemilli)),
                                      "h:mm:ss a @ do 'of' MMMM, yyyy"
                                    )}
                                  </span>
                                </div>
                                <div className="text-orange dark:text-lightOrange">
                                  {data.header.block}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                    {data.istransaction && (
                      <Link to={`/transactions/${data.txpowid}`}>
                        <div
                          className={`bg-grey10 dark:bg-darkContrast col-span-3 rounded`}
                        >
                          <div className="h-fit p-4 lg:p-6">
                            <div className="flex gap-6 xl:gap-8">
                              <div className="flex items-center justify-center">
                                <div className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-md bg-white dark:bg-mediumDarkContrast">
                                  <svg
                                    width="18"
                                    height="20"
                                    viewBox="0 0 18 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-black dark:fill-white"
                                  >
                                    <path d="M9 19.7115L0.25 14.8557V5.1442L9 0.288452L17.75 5.1442V14.8557L9 19.7115ZM6.148 7.5577C6.51217 7.14487 6.941 6.8237 7.4345 6.5942C7.92817 6.3647 8.45 6.24995 9 6.24995C9.55 6.24995 10.0718 6.3647 10.5655 6.5942C11.059 6.8237 11.4878 7.14487 11.852 7.5577L15.4098 5.57495L9 2.01145L2.59025 5.57495L6.148 7.5577ZM8.25 17.573V13.6827C7.36917 13.4877 6.649 13.048 6.0895 12.3635C5.52983 11.6788 5.25 10.891 5.25 9.99995C5.25 9.79745 5.26317 9.60737 5.2895 9.4297C5.31567 9.2522 5.36017 9.07045 5.423 8.88445L1.75 6.82695V13.9692L8.25 17.573ZM9 12.25C9.627 12.25 10.1588 12.0317 10.5953 11.5952C11.0317 11.1587 11.25 10.627 11.25 9.99995C11.25 9.37295 11.0317 8.8412 10.5953 8.4047C10.1588 7.9682 9.627 7.74995 9 7.74995C8.373 7.74995 7.84125 7.9682 7.40475 8.4047C6.96825 8.8412 6.75 9.37295 6.75 9.99995C6.75 10.627 6.96825 11.1587 7.40475 11.5952C7.84125 12.0317 8.373 12.25 9 12.25ZM9.75 17.573L16.25 13.9692V6.82695L12.577 8.88445C12.6398 9.07045 12.6843 9.2522 12.7105 9.4297C12.7368 9.60737 12.75 9.79745 12.75 9.99995C12.75 10.891 12.4702 11.6788 11.9105 12.3635C11.351 13.048 10.6308 13.4877 9.75 13.6827V17.573Z"></path>
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 text-sm text-black lg:-mt-1 dark:text-grey20 break-words">
                                  Transaction -{' '}
                                  <span className="text-xs text-grey80">
                                    {formatDate(
                                      new Date(Number(data.header.timemilli)),
                                      "h:mm a @ do 'of' MMMM, yyyy"
                                    )}
                                  </span>
                                </div>
                                <div className="hidden text-orange lg:block dark:text-lightOrange">
                                  {data.txpowid}
                                </div>
                                <div className="block text-sm text-orange lg:hidden dark:text-lightOrange break-all">
                                  {getTextSnippet(data.txpowid, 10, 22)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </>
                )}
                {data &&
                  Array.isArray(data) &&
                  data.map((data) => (
                    <>
                      {!data.istransaction && (
                        <Link to={`/blocks/${data.txpowid}`}>
                          <div
                            className={`bg-grey10 dark:bg-darkContrast hover:bg-grey20 dark:hover:bg-mediumDarkContrast ${`col-span-${3}`} rounded`}
                          >
                            <div className="h-fit p-4 lg:p-6">
                              <div className="flex gap-4">
                                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-md bg-white dark:bg-mediumDarkContrast">
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
                                </div>
                                <div>
                                  <div className="-mt-1 mb-1 text-sm text-black dark:text-grey20">
                                    Block -{' '}
                                    <span className="text-xs text-darkContrast dark:text-grey80">
                                      {formatDate(
                                        new Date(Number(data.header.timemilli)),
                                        "h:mm:ss a @ do 'of' MMMM, yyyy"
                                      )}
                                    </span>
                                  </div>
                                  <div className="text-orange dark:text-lightOrange">
                                    {data.header.block}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                      {data.istransaction && (
                        <Link to={`/transactions/${data.txpowid}`}>
                          <div
                            className={`bg-grey10 dark:bg-darkContrast col-span-3 rounded`}
                          >
                            <div className="h-fit p-4 lg:p-6">
                              <div className="flex gap-6 xl:gap-8">
                                <div className="flex items-center justify-center">
                                  <div className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-md bg-white dark:bg-mediumDarkContrast">
                                    <svg
                                      width="18"
                                      height="20"
                                      viewBox="0 0 18 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="fill-black dark:fill-white"
                                    >
                                      <path d="M9 19.7115L0.25 14.8557V5.1442L9 0.288452L17.75 5.1442V14.8557L9 19.7115ZM6.148 7.5577C6.51217 7.14487 6.941 6.8237 7.4345 6.5942C7.92817 6.3647 8.45 6.24995 9 6.24995C9.55 6.24995 10.0718 6.3647 10.5655 6.5942C11.059 6.8237 11.4878 7.14487 11.852 7.5577L15.4098 5.57495L9 2.01145L2.59025 5.57495L6.148 7.5577ZM8.25 17.573V13.6827C7.36917 13.4877 6.649 13.048 6.0895 12.3635C5.52983 11.6788 5.25 10.891 5.25 9.99995C5.25 9.79745 5.26317 9.60737 5.2895 9.4297C5.31567 9.2522 5.36017 9.07045 5.423 8.88445L1.75 6.82695V13.9692L8.25 17.573ZM9 12.25C9.627 12.25 10.1588 12.0317 10.5953 11.5952C11.0317 11.1587 11.25 10.627 11.25 9.99995C11.25 9.37295 11.0317 8.8412 10.5953 8.4047C10.1588 7.9682 9.627 7.74995 9 7.74995C8.373 7.74995 7.84125 7.9682 7.40475 8.4047C6.96825 8.8412 6.75 9.37295 6.75 9.99995C6.75 10.627 6.96825 11.1587 7.40475 11.5952C7.84125 12.0317 8.373 12.25 9 12.25ZM9.75 17.573L16.25 13.9692V6.82695L12.577 8.88445C12.6398 9.07045 12.6843 9.2522 12.7105 9.4297C12.7368 9.60737 12.75 9.79745 12.75 9.99995C12.75 10.891 12.4702 11.6788 11.9105 12.3635C11.351 13.048 10.6308 13.4877 9.75 13.6827V17.573Z"></path>
                                    </svg>
                                  </div>
                                </div>
                                <div>
                                  <div className="mb-1 text-sm text-black lg:-mt-1 dark:text-grey20 break-words">
                                    Transaction -{' '}
                                    <span className="text-xs text-grey80">
                                      {formatDate(
                                        new Date(Number(data.header.timemilli)),
                                        "h:mm a @ do 'of' MMMM, yyyy"
                                      )}
                                    </span>
                                  </div>
                                  <div className="hidden text-orange lg:block dark:text-lightOrange">
                                    {data.txpowid}
                                  </div>
                                  <div className="block text-sm text-orange lg:hidden dark:text-lightOrange break-all">
                                    {getTextSnippet(data.txpowid, 10, 22)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </>
                  ))}
              </div>
            </>
          )}
        </div>
      </Section>
    </div>
  )
}

export default Search

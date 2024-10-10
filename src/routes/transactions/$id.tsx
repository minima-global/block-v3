import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import Title from '../../Components/Title.tsx'
import Section from '../../Components/Section.tsx'
import { Fragment, useContext, useEffect, useState } from 'react'
import { checkTransactionConfirmation, txPowById } from '../../__minima__'
import ArrowBack from '../../Components/ArrowBack.tsx'
import InfoTable from '../../Components/InfoTable.tsx'
import { getTextSnippet } from '../../utils'
import OverviewTable from '../../Components/OverviewTable.tsx'
import Copy from '../../Components/Copy.tsx'
import CollapsableSection from '../../CollapsableSection.tsx'
import NumberedInfoTable from '../../Components/NumberedInfoTable.tsx'
import { formatDate } from 'date-fns'
import { TxPow } from '../../types.ts'
import { appContext } from '../../AppContext.tsx'

export const Route = createFileRoute('/transactions/$id')({
  component: Index,
})

function Index() {
  const router = useRouter()
  const { loaded } = useContext(appContext)
  const { id } = Route.useParams()
  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<TxPow | null>(null)
  const [showView, setShowView] = useState('Details')

  const [isFetchingConfirmed, setIsFetchingConfirmed] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState<
    | {
        block: string
        txnId: string
        blockTxnId: string
      }
    | undefined
  >(undefined)

  useEffect(() => {
    if (id && loaded) {
      txPowById(id)
        .then((response) => {
          setData(response)
          setIsFetching(false)
        })
        .catch(() => {
          setIsFetching(false)
        })
    }
  }, [id, loaded])

  useEffect(() => {
    if (data && loaded && !isConfirmed) {
      checkTransactionConfirmation(Number(data.header.block), data.txpowid)
        .then((response) => {
          setIsConfirmed(response)
          setIsFetchingConfirmed(false)
        })
        .catch(() => {
          setIsFetchingConfirmed(false)
        })
    }
  }, [id, data, loaded])

  const TABS = [
    {
      title: 'Details',
    },
    {
      title: 'Inputs',
    },
    {
      title: 'Outputs',
    },
    {
      title: 'State variables',
    },
    {
      title: 'JSON',
    },
  ]

  return (
    <div>
      <Section className="mt-10 lg:mt-14">
        <div
          onClick={() => router.history.back()}
          className="flex items-center gap-4 dark:text-white cursor-pointer"
        >
          <ArrowBack />
          Back
        </div>
      </Section>
      <Title title={`Txn ID. ${getTextSnippet(id)}`} />
      <Section className="-mt-4 mb-4 text-black lg:-mt-8 lg:mb-10 dark:text-grey80">
        {!isFetchingConfirmed && isConfirmed && (
          <div className="flex items-center gap-2">
            <div className="flex w-fit items-center gap-3 border px-3 py-1.5 text-xs lg:text-sm dark:border-green-900 dark:bg-green-900 dark:bg-opacity-20">
              <span>Status:</span>
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M13.5726 23.5308L24.7951 12.3083L23.2413 10.772L13.5726 20.4516L8.69883 15.5779L7.173 17.1141L13.5726 23.5308ZM16.003 32.3191C13.8244 32.3191 11.7734 31.9036 9.85008 31.0725C7.92675 30.2414 6.24772 29.1089 4.813 27.675C3.37855 26.2408 2.2455 24.5625 1.41383 22.64C0.582442 20.7175 0.166748 18.667 0.166748 16.4887C0.166748 14.2987 0.582304 12.2402 1.41341 10.3133C2.24453 8.38635 3.37703 6.71024 4.81091 5.28497C6.24508 3.85969 7.92341 2.73122 9.84591 1.89955C11.7684 1.06816 13.8188 0.652466 15.9972 0.652466C18.1872 0.652466 20.2456 1.06802 22.1726 1.89913C24.0995 2.73024 25.7756 3.85816 27.2009 5.28288C28.6262 6.7076 29.7547 8.38302 30.5863 10.3091C31.4177 12.2352 31.8334 14.2932 31.8334 16.4829C31.8334 18.6615 31.4179 20.7125 30.5868 22.6358C29.7556 24.5591 28.6277 26.2382 27.203 27.6729C25.7783 29.1073 24.1029 30.2404 22.1767 31.0721C20.2506 31.9034 18.1927 32.3191 16.003 32.3191ZM16.0001 30.225C19.8276 30.225 23.0744 28.8891 25.7405 26.2175C28.4063 23.5458 29.7392 20.3019 29.7392 16.4858C29.7392 12.6583 28.4063 9.41149 25.7405 6.74538C23.0744 4.07955 19.8276 2.74663 16.0001 2.74663C12.184 2.74663 8.94008 4.07955 6.26841 6.74538C3.59675 9.41149 2.26091 12.6583 2.26091 16.4858C2.26091 20.3019 3.59675 23.5458 6.26841 26.2175C8.94008 28.8891 12.184 30.225 16.0001 30.225Z"
                  fill="#20C2BA"
                />
              </svg>

              <span className="text-black dark:text-white">Confirmed</span>
            </div>
            <Link to={`/blocks/$id`} params={{ id: isConfirmed.blockTxnId }}>
              <div className="flex w-fit items-center gap-3 border py-1.5 pl-3 pr-2.5 text-sm dark:border-mediumDarkContrast dark:bg-mediumDarkContrast dark:bg-opacity-50">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-black dark:fill-white"
                >
                  <path d="M9 19.7115L0.25 14.8557V5.1442L9 0.288452L17.75 5.1442V14.8557L9 19.7115ZM6.148 7.5577C6.51217 7.14487 6.941 6.8237 7.4345 6.5942C7.92817 6.3647 8.45 6.24995 9 6.24995C9.55 6.24995 10.0718 6.3647 10.5655 6.5942C11.059 6.8237 11.4878 7.14487 11.852 7.5577L15.4098 5.57495L9 2.01145L2.59025 5.57495L6.148 7.5577ZM8.25 17.573V13.6827C7.36917 13.4877 6.649 13.048 6.0895 12.3635C5.52983 11.6788 5.25 10.891 5.25 9.99995C5.25 9.79745 5.26317 9.60737 5.2895 9.4297C5.31567 9.2522 5.36017 9.07045 5.423 8.88445L1.75 6.82695V13.9692L8.25 17.573ZM9 12.25C9.627 12.25 10.1588 12.0317 10.5953 11.5952C11.0317 11.1587 11.25 10.627 11.25 9.99995C11.25 9.37295 11.0317 8.8412 10.5953 8.4047C10.1588 7.9682 9.627 7.74995 9 7.74995C8.373 7.74995 7.84125 7.9682 7.40475 8.4047C6.96825 8.8412 6.75 9.37295 6.75 9.99995C6.75 10.627 6.96825 11.1587 7.40475 11.5952C7.84125 12.0317 8.373 12.25 9 12.25ZM9.75 17.573L16.25 13.9692V6.82695L12.577 8.88445C12.6398 9.07045 12.6843 9.2522 12.7105 9.4297C12.7368 9.60737 12.75 9.79745 12.75 9.99995C12.75 10.891 12.4702 11.6788 11.9105 12.3635C11.351 13.048 10.6308 13.4877 9.75 13.6827V17.573Z"></path>
                </svg>
                Block {isConfirmed.block}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        )}
        {!isFetchingConfirmed && !isConfirmed && (
          <div className="flex w-fit items-center gap-3 border px-3 py-1.5 text-xs lg:text-sm dark:border-yellow-900 dark:bg-yellow-900 dark:bg-opacity-20">
            <span>Status:</span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-orange dark:fill-lightOrange"
            >
              <path d="M22.0984 23.6408L23.6238 22.1154L17.1088 15.572V7.40163H15.0151V16.4275L22.0984 23.6408ZM16.003 31.8333C13.8244 31.8333 11.7734 31.4177 9.85008 30.5866C7.92675 29.7555 6.24772 28.623 4.813 27.1891C3.37855 25.755 2.2455 24.0766 1.41383 22.1541C0.582442 20.2316 0.166748 18.1812 0.166748 16.0029C0.166748 13.8243 0.582304 11.7733 1.41341 9.84996C2.24453 7.92663 3.37703 6.2476 4.81091 4.81288C6.24508 3.37843 7.92341 2.24538 9.84591 1.41371C11.7684 0.58232 13.8188 0.166626 15.9972 0.166626C18.1758 0.166626 20.2267 0.582181 22.1501 1.41329C24.0734 2.2444 25.7524 3.3769 27.1872 4.81079C28.6216 6.24496 29.7547 7.92329 30.5863 9.84579C31.4177 11.7683 31.8334 13.8187 31.8334 15.997C31.8334 18.1757 31.4179 20.2266 30.5868 22.15C29.7556 24.0733 28.6231 25.7523 27.1892 27.187C25.7551 28.6215 24.0767 29.7545 22.1542 30.5862C20.2317 31.4176 18.1813 31.8333 16.003 31.8333ZM16.0001 29.7391C19.7884 29.7391 23.0254 28.3963 25.7109 25.7108C28.3965 23.0252 29.7392 19.7883 29.7392 16C29.7392 12.2116 28.3965 8.97468 25.7109 6.28913C23.0254 3.60357 19.7884 2.26079 16.0001 2.26079C12.2117 2.26079 8.9748 3.60357 6.28925 6.28913C3.60369 8.97468 2.26091 12.2116 2.26091 16C2.26091 19.7883 3.60369 23.0252 6.28925 25.7108C8.9748 28.3963 12.2117 29.7391 16.0001 29.7391Z" />
            </svg>

            <span className="text-black dark:text-white">Pending</span>
          </div>
        )}
        {isFetchingConfirmed && <div className="skele h-[34px] w-[300px]" />}
      </Section>
      <Section className="mt-8">
        <h5 className="mb-4 text-xl text-orange dark:text-lightOrange">
          Overview
        </h5>
        <div className="rounded bg-grey10 dark:bg-darkContrast">
          <div className="mb-8 h-fit p-6">
            <div>
              <OverviewTable
                isLoading={isFetching}
                data={[
                  {
                    title: 'TXPow ID',
                    value: data?.txpowid,
                    copyable: true,
                  },
                  {
                    title: 'Datetime',
                    value:
                      data?.header.timemilli &&
                      formatDate(
                        new Date(Number(data.header.timemilli)),
                        "h:mm:ss a @ do 'of' MMMM, yyyy"
                      ),
                  },
                  {
                    title: 'Inputs',
                    value: `${data?.body?.txn.inputs.length} input${
                      data?.body?.txn.inputs.length &&
                      data?.body?.txn.inputs.length > 1
                        ? 's'
                        : ''
                    }`,
                  },
                  {
                    title: 'Outputs',
                    value: `${data?.body?.txn.outputs.length} output${
                      data?.body?.txn.outputs.length &&
                      data?.body?.txn.outputs.length > 1
                        ? 's'
                        : ''
                    }`,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="mb-6 hidden gap-10 text-xl lg:flex">
          {TABS.map((tab) => (
            <div
              key={tab.title}
              onClick={() => setShowView(tab.title)}
              className={`cursor-pointer border-b-4 pb-1 ${tab.title === showView ? 'border-b-orange text-orange dark:border-b-lightOrange dark:text-lightOrange' : 'dark:text-white border-b-transparent'}`}
            >
              {tab.title}
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="block lg:hidden">
          <h5 className="mb-4 text-xl text-orange dark:text-lightOrange">
            Details
          </h5>
        </div>
      </Section>
      {showView === 'Details' && (
        <Section className="mt-5 lg:mb-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
              <InfoTable
                title="Block details"
                isLoading={isFetching}
                data={[
                  {
                    label: 'Timestamp',
                    value: data?.header?.timemilli,
                  },
                  {
                    label: 'Size',
                    value: data?.size,
                  },
                  {
                    label: 'Parent',
                    value: data?.header?.superparents?.[0]!.parent,
                    href: `/blocks/${data?.header?.superparents?.[0]!.parent}`,
                    valueClassName:
                      'text-orange hover:text-lightOrange dark:text-lightOrange dark:hover:text-lighterOrange',
                    copyable: true,
                  },
                ]}
              />
              <div className="hidden">
                <div className="flex w-full rounded-tl rounded-tr bg-grey20 p-3 px-5 text-black dark:bg-mediumDarkContrast dark:text-grey80">
                  Output amounts
                </div>
                <div>
                  <NumberedInfoTable
                    isLoading={isFetching}
                    copyable={false}
                    data={data?.body?.txn.outputs.map(
                      (i) => `${i.tokenid} - ${i.amount}`
                    )}
                  />
                </div>
              </div>
              <InfoTable
                title="Burn transaction"
                isLoading={isFetching}
                data={[
                  {
                    label: 'Transaction ID',
                    value: data?.body?.burntxn.transactionid,
                    copyable: true,
                  },
                  {
                    label: 'Link hash',
                    value: data?.body?.burntxn.linkhash,
                  },
                ]}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
              <div>
                <div className="text-sm lg:text-md flex rounded-tl rounded-tr bg-grey20 p-3 px-5 text-black dark:bg-mediumDarkContrast dark:text-grey80">
                  From / Input addresses
                </div>
                <div>
                  <NumberedInfoTable
                    isLoading={isFetching}
                    searchable
                    copyable
                    data={[...new Set(data?.body?.txn.inputs)].map(
                      (i) => i.address
                    )}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm lg:text-md flex w-full rounded-tl rounded-tr bg-grey20 p-3 px-5 text-black dark:bg-mediumDarkContrast dark:text-grey80">
                  To / Output addresses
                </div>
                <div>
                  <NumberedInfoTable
                    isLoading={isFetching}
                    searchable
                    copyable
                    data={[...new Set(data?.body?.txn.outputs)].map(
                      (i) => i.address
                    )}
                  />
                </div>
              </div>
              <InfoTable
                title="Scripts / Smart contracts"
                isLoading={isFetching}
                data={
                  data?.body?.witness.scripts &&
                  data?.body?.witness.scripts.length > 0
                    ? [
                        ...(data &&
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          data.body?.witness.scripts.map((txn) => [
                            {
                              label: 'Script',
                              value: txn.script,
                              valueClassName:
                                'text-md text-black dark:text-white',
                            },
                            {
                              label: 'Address',
                              value: txn.address,
                              copyable: true,
                            },
                          ])),
                      ].flat()
                    : [
                        {
                          label: 'There are no scripts for this transaction',
                        },
                      ]
                }
              />
              <div>
                <div className="text-sm lg:text-md flex rounded-tl rounded-tr bg-grey20 p-3 px-5 text-black dark:bg-mediumDarkContrast dark:text-grey80">
                  Transaction Signatures
                </div>
                <div>
                  <NumberedInfoTable
                    isLoading={isFetching}
                    searchable
                    noDataLabel="There are no signatures for this transaction"
                    data={data?.body?.witness.signatures
                      .map((data) => data.signatures!.map((i) => i.publickey))
                      .flat()}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
      <Section className="mb-8 lg:hidden">
        <CollapsableSection title="Inputs">
          <div className="flex flex-col gap-4">
            {data?.body?.txn.inputs.map((data, index) => (
              <Fragment key={`${data.coinid}`}>
                <InfoTable
                  title={`Input: ${index + 1}`}
                  isLoading={isFetching}
                  data={[
                    {
                      label: 'Coin ID',
                      value: data.coinid,
                    },
                    {
                      label: 'Address',
                      value: data.address,
                      copyable: true,
                    },
                    {
                      label: 'Mini Address',
                      value: data.miniaddress,
                      copyable: true,
                    },
                    {
                      label: 'Token ID',
                      value: data.tokenid,
                      copyable: true,
                    },
                    {
                      label: 'Amount',
                      value: data.amount,
                    },
                  ]}
                />
              </Fragment>
            ))}
          </div>
        </CollapsableSection>
        <div className="border-b border-grey40 dark:border-mediumDarkContrast"></div>
        <CollapsableSection title="Outputs">
          <div className="flex flex-col gap-4">
            {data?.body?.txn.outputs.map((data, index) => (
              <Fragment key={data.coinid}>
                <InfoTable
                  title={`Output: ${index + 1}`}
                  data={[
                    {
                      label: 'Coin ID',
                      value: data.coinid,
                    },
                    {
                      label: 'Address',
                      value: data.address,
                      copyable: true,
                    },
                    {
                      label: 'Mini Address',
                      value: data.miniaddress,
                      copyable: true,
                    },
                    {
                      label: 'Token ID',
                      value: data.tokenid,
                      copyable: true,
                    },
                    {
                      label: 'Amount',
                      value: data.amount,
                    },
                  ]}
                />
              </Fragment>
            ))}
          </div>
        </CollapsableSection>
        <div className="border-b border-grey40 dark:border-mediumDarkContrast"></div>
        <CollapsableSection title="State Variables">
          <div className="rounded bg-grey10 text-black dark:bg-darkContrast dark:text-grey20">
            <div className="h-fit p-6">
              <div className="-mb-2 flex items-center gap-2 text-sm">
                <pre className="w-full whitespace-break-spaces break-all text-xs">
                  {data &&
                    JSON.stringify(
                      {
                        ...data?.body?.txn.state,
                        id: undefined,
                        is_transaction: undefined,
                        datetime: undefined,
                      },
                      null,
                      4
                    )}
                </pre>
              </div>
            </div>
          </div>
        </CollapsableSection>
        <div className="border-b border-grey40 dark:border-mediumDarkContrast"></div>
        <CollapsableSection title="JSON">
          <div className="rounded bg-grey10 text-black dark:bg-darkContrast dark:text-grey20">
            <div className="h-fit p-6">
              <div className="-mb-2 flex items-center gap-2 text-sm">
                <pre className="w-full whitespace-break-spaces break-all text-xs">
                  {data &&
                    JSON.stringify(
                      {
                        ...data,
                        id: undefined,
                        is_transaction: undefined,
                        datetime: undefined,
                        is_confirmed: undefined,
                        confirmed_block: undefined,
                      },
                      null,
                      4
                    )}
                </pre>
              </div>
            </div>
          </div>
        </CollapsableSection>
      </Section>
      {showView === 'Inputs' && (
        <Section className="mb-12 mt-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              {data?.body?.txn.inputs.map((data, index) => (
                <Fragment key={data.address}>
                  <InfoTable
                    title={`Input: ${index + 1}`}
                    isLoading={isFetching}
                    data={[
                      {
                        label: 'Coin ID',
                        value: data.coinid,
                      },
                      {
                        label: 'Address',
                        value: data.address,
                        copyable: true,
                      },
                      {
                        label: 'Mini Address',
                        value: data.miniaddress,
                        copyable: true,
                      },
                      {
                        label: 'Token ID',
                        href: `/search?q=${data.tokenid}`,
                        value: data.tokenid,
                        copyable: true,
                      },
                      {
                        label: 'Total output',
                        value: data.amount,
                      },
                    ]}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </Section>
      )}
      {showView === 'Outputs' && (
        <Section className="mb-12 mt-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              {data?.body?.txn.outputs.map((data, index) => (
                <Fragment key={data.address}>
                  <InfoTable
                    title={`Output: ${index + 1}`}
                    data={[
                      {
                        label: 'Coin ID',
                        value: data.coinid,
                      },
                      {
                        label: 'Address',
                        value: data.address,
                        copyable: true,
                      },
                      {
                        label: 'Mini Address',
                        value: data.miniaddress,
                        copyable: true,
                      },
                      {
                        label: 'Token ID',
                        href: `/search?q=${data.tokenid}`,
                        value: data.tokenid,
                        copyable: true,
                      },
                      {
                        label: 'Output Amount',
                        value: data.amount,
                      },
                    ]}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </Section>
      )}
      {showView === 'State variables' && (
        <Section className="mb-12 mt-5">
          <div className="rounded bg-grey10 text-black dark:bg-darkContrast dark:text-grey20">
            <div className="h-fit p-6">
              <div className="-mb-2 w-full flex items-center gap-2 text-sm">
                <pre className="w-full whitespace-break-spaces break-all text-xs">
                  {data &&
                    JSON.stringify(
                      {
                        ...data?.body?.txn.state,
                        id: undefined,
                        is_transaction: undefined,
                        datetime: undefined,
                      },
                      null,
                      4
                    )}
                </pre>
              </div>
            </div>
          </div>
        </Section>
      )}
      {showView === 'JSON' && (
        <Section className="mb-12 mt-5">
          <div className="rounded bg-grey10 text-black dark:bg-darkContrast dark:text-grey20">
            <div className="h-fit p-6">
              <div className="-mb-2 flex items-center gap-2 text-sm">
                <div className="relative">
                  <pre className="custom-scrollbar max-h-[400px] w-full overflow-y-scroll whitespace-break-spaces break-all text-xs">
                    {data &&
                      JSON.stringify(
                        {
                          ...data,
                          id: undefined,
                          is_transaction: undefined,
                          datetime: undefined,
                          is_confirmed: undefined,
                          confirmed_block: undefined,
                          confirmed_block_txpow_id: undefined,
                        },
                        null,
                        4
                      )}
                  </pre>
                  <div className="absolute bottom-3 right-3">
                    <Copy
                      value={JSON.stringify(
                        {
                          ...data,
                          id: undefined,
                          is_transaction: undefined,
                          datetime: undefined,
                          is_confirmed: undefined,
                          confirmed_block: undefined,
                          confirmed_block_txpow_id: undefined,
                        },
                        null,
                        4
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </div>
  )
}

export default Index

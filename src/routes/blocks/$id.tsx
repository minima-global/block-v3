import { createFileRoute, Link } from '@tanstack/react-router'
import Title from '../../Components/Title.tsx'
import Section from '../../Components/Section.tsx'
import { Fragment, useContext, useEffect, useState } from 'react'
import { txPowById } from '../../__minima__'
import { formatDate } from 'date-fns'
import ArrowBack from '../../Components/ArrowBack.tsx'
import InfoTable from '../../Components/InfoTable.tsx'
import { TxPow } from '../../types.ts'
import { appContext } from '../../AppContext.tsx'
import NumberedInfoTable from '../../Components/NumberedInfoTable.tsx'
import Copy from '../../Components/Copy.tsx'
import OverviewTable from '../../Components/OverviewTable.tsx'

export const Route = createFileRoute('/blocks/$id')({
  component: Index,
})

function Index() {
  const { loaded } = useContext(appContext)
  const { id } = Route.useParams()
  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<TxPow | null>(null)
  const [showView, setShowView] = useState('Details')

  const blockNumber = data
    ? data.header.block && Number(data.header.block).toLocaleString()
    : ''

  useEffect(() => {
    if (loaded && id && !data) {
      txPowById(id)
        .then((response) => {
          setData(response)
          setIsFetching(false)
        })
        .catch(() => {
          setIsFetching(false)
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
        <Link to="/" className="flex items-center gap-4 dark:text-white">
          <ArrowBack />
          Back
        </Link>
      </Section>
      <Title title={`Block No. ${blockNumber}`} />
      <Section className="mt-4">
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
                    label: 'Super block',
                    value: data?.superblock,
                  },
                  {
                    label: 'Size',
                    value: data?.size,
                  },
                  {
                    label: 'Number of transactions',
                    value:
                      (data?.body?.txnlist ? data?.body?.txnlist?.length : 0) +
                      (data?.istransaction ? 1 : 0),
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
                <InfoTable
                    title="Transactions in the block"
                    isLoading={isFetching}
                    data={
                        data?.body?.txnlist && data?.body?.txnlist.length > 0
                            ? data?.body.txnlist.map((txn) => ({
                                label: 'Transaction ID',
                                value: txn,
                                href: `/transactions/${txn}`,
                                valueClassName: 'text-orange dark:text-lightOrange',
                                copyable: true,
                            }))
                            : [
                                {
                                    label: 'There are no transactions in this block',
                                    ignoreHiddenSpace: true,
                                },
                            ]
                    }
                />
                <div>
                <div className="text-sm lg:text-md flex rounded-tl rounded-tr bg-grey20 p-3 px-5 text-black dark:bg-mediumDarkContrast dark:text-grey80">
                  From / Input addresses
                </div>
                <div>
                  <NumberedInfoTable
                    isLoading={isFetching}
                    searchable
                    copyable
                    noDataLabel="This block is not a transaction"
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
                    noDataLabel="This block is not a transaction"
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
                          label: 'This block is not a transaction',
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
                    noDataLabel="This block is not a transaction"
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
      {showView === 'Inputs' && (
        <Section className="mb-12 mt-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              {data?.body?.txn.inputs.length === 0 && (
                <InfoTable
                  title={`Inputs`}
                  data={[
                    {
                      label: 'This block is not a transaction',
                    },
                  ]}
                />
              )}
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
              {data?.body?.txn.outputs.length === 0 && (
                <InfoTable
                  title={`Inputs`}
                  data={[
                    {
                      label: 'This block is not a transaction',
                    },
                  ]}
                />
              )}
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
        </Section>
      )}
      {showView === 'JSON' && (
        <Section className="mb-12 mt-5">
          <div className="rounded bg-grey10 text-black dark:bg-darkContrast dark:text-grey20">
            <div className="h-fit p-6">
              <div className="-mb-2 w-full flex items-center gap-2 text-sm">
                <div className="relative w-full">
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

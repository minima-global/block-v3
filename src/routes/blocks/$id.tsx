import { createFileRoute, Link } from '@tanstack/react-router'
import Title from '../../Components/Title.tsx'
import Section from '../../Components/Section.tsx'
import { useContext, useEffect, useState } from 'react'
import { txPowById } from '../../__minima__'
import { formatDate } from 'date-fns'
import ArrowBack from '../../Components/ArrowBack.tsx'
import InfoTable from '../../Components/InfoTable.tsx'
import { TxPow } from '../../types.ts'
import { appContext } from '../../AppContext.tsx'

export const Route = createFileRoute('/blocks/$id')({
  component: Index,
})

function Index() {
  const { loaded } = useContext(appContext)
  const { id } = Route.useParams()
  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<TxPow | null>(null)

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

  return (
    <div>
      <Section className="mt-10 lg:mt-14">
        <Link to="/" className="flex items-center gap-4 dark:text-white">
          <ArrowBack />
          Back
        </Link>
      </Section>
      <Title title={`Block No. ${blockNumber}`} />
      <Section className="mb-8">
        <div className="flex gap-10 text-xl">
          <div className="pb-1 text-orange dark:text-lightOrange">Details</div>
        </div>
      </Section>
      <Section className="mb-12 mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
            <InfoTable
              title="Block details"
              isLoading={isFetching}
              data={[
                {
                  label: 'TxPoW ID',
                  value: data?.txpowid,
                  copyable: true,
                },
                {
                  label: 'Datetime',
                  value:
                    data?.header?.timemilli &&
                    formatDate(
                      new Date(Number(data?.header?.timemilli)),
                      "h:mm:ss a @ do 'of' MMMM, yyyy"
                    ),
                },
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
                  value: data?.body?.txnlist?.length,
                },
                {
                  label: 'Parent:',
                  value: data?.header?.superparents?.[0]!.parent,
                  href: `/blocks/${data?.header?.superparents?.[0]!.parent}`,
                  valueClassName:
                    'text-orange hover:text-lightOrange dark:text-lightOrange dark:hover:text-lighterOrange',
                  copyable: true,
                },
              ]}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
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
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Index

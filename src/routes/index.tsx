import { createFileRoute } from '@tanstack/react-router'
import Title from '../Components/Title.tsx'
import Search from '../Components/Search.tsx'
import Section from '../Components/Section.tsx'
import { useContext } from 'react'
import { appContext } from '../AppContext.tsx'
import StatsCard from '../Components/StatsCard.tsx'
import LatestBlocks from '../Components/LatestBlocks.tsx'
import LatestTransactions from '../Components/LatestTransactions.tsx'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { topBlock, totalSupply, transactionsInLast24Hours, blocksInLast24Hours } =
    useContext(appContext)

  const DISPLAYED_STATS = [
    {
      id: 'total_supply',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:fill-grey20 fill-black"
        >
          <path
            d="M10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5Z"
            fill="#currentColor"
          />
        </svg>
      ),
      title: 'Total supply',
      value: totalSupply,
      isLoading: totalSupply === null,
    },
    {
      id: 'total_number_of_transactions',
      icon: (
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:fill-grey20 fill-black"
        >
          <path
            d="M5.15375 15.4902L0.5 10.8365L5.15375 6.18275L6.20775 7.252L3.373 10.0865H10.6538V11.5865H3.373L6.20775 14.4212L5.15375 15.4902ZM14.8462 9.80775L13.7923 8.7385L16.627 5.90375H9.34625V4.404H16.627L13.7923 1.56925L14.8462 0.5L19.5 5.15375L14.8462 9.80775Z"
            fill="#currentColor"
          />
        </svg>
      ),
      title: 'Transactions in the last day',
      value: transactionsInLast24Hours,
      isLoading: transactionsInLast24Hours === null,
    },
    {
      id: 'block_height',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:fill-grey20 fill-black"
        >
          <mask
            id="mask0_2918_7164"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#currentColor" />
          </mask>
          <g>
            <path
              d="M11.25 19.5692V12.4307L5 8.81147V15.777C5 15.8281 5.01283 15.8762 5.0385 15.9212C5.06417 15.9661 5.10258 16.0045 5.15375 16.0365L11.25 19.5692ZM12.75 19.5692L18.8462 16.0365C18.8974 16.0045 18.9358 15.9661 18.9615 15.9212C18.9872 15.8762 19 15.8281 19 15.777V8.81147L12.75 12.4307V19.5692ZM12 11.1385L18.175 7.56922L12.1538 4.08647C12.1026 4.05447 12.0513 4.03847 12 4.03847C11.9487 4.03847 11.8974 4.05447 11.8463 4.08647L5.825 7.56922L12 11.1385ZM4.404 17.3537C4.11933 17.1897 3.8975 16.9706 3.7385 16.6962C3.5795 16.4217 3.5 16.1204 3.5 15.7922V8.20772C3.5 7.87956 3.5795 7.57822 3.7385 7.30372C3.8975 7.02939 4.11933 6.81022 4.404 6.64622L11.0963 2.79422C11.3808 2.63006 11.682 2.54797 12 2.54797C12.318 2.54797 12.6193 2.63006 12.9038 2.79422L19.596 6.64622C19.8807 6.81022 20.1025 7.02939 20.2615 7.30372C20.4205 7.57822 20.5 7.87956 20.5 8.20772V15.7922C20.5 16.1204 20.4205 16.4217 20.2615 16.6962C20.1025 16.9706 19.8807 17.1897 19.596 17.3537L12.9038 21.2057C12.6193 21.3699 12.318 21.452 12 21.452C11.682 21.452 11.3808 21.3699 11.0963 21.2057L4.404 17.3537Z"
              fill="#currentColor"
            />
          </g>
        </svg>
      ),
      title: 'Block height',
      value: topBlock,
      isLoading: topBlock === null,
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
      title: 'Number of blocks in the last day',
      value: `${blocksInLast24Hours} blocks`,
      isLoading: blocksInLast24Hours === null,
    },
  ]

  return (
    <div>
      <Title title="Minima Explorer" gradient={true} />
      <Section>
        <div className="mb-8 grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6 flex items-center">
            <h2 className="text-2xl dark:text-white -mt-2">Latest blocks</h2>
          </div>
          <div className="col-span-12 flex justify-end lg:col-span-6">
            <div className="mt-7 w-full lg:mt-0 lg:max-w-[400px]">
              <Search />
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="mb-5 grid grid-cols-12 gap-3 lg:mb-10 lg:gap-6">
          {DISPLAYED_STATS.map((stats) => (
            <StatsCard lgSpan={6} xlSpan={3} key={stats.title} {...stats} />
          ))}
        </div>
      </Section>
      <Section>
        <div className="mb-10 grid grid-cols-12 gap-6 lg:mb-20">
          <div className="col-span-12 lg:col-span-6">
            <LatestTransactions />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <LatestBlocks />
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Index

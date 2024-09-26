import { Fragment } from 'react'
import Copy from './Copy'

type NumberedInfoTableProps = {
  data?: string[]
  isLoading?: boolean
  noDataLabel?: string
  searchable?: boolean
  copyable?: boolean
}

const NumberedInfoTable: React.FC<NumberedInfoTableProps> = ({
  isLoading,
  data,
  noDataLabel,
  searchable = false,
  copyable = false,
}) => (
  <div>
    <div className="flex flex-col gap-4 bg-grey10 p-4 text-black dark:bg-darkContrast dark:text-white">
      {isLoading && <div className="skele h-[30px] w-full" />}
      {!isLoading && data?.length === 0 && (
        <div className="text-grey80">
          {noDataLabel ? noDataLabel : 'There is no data'}
        </div>
      )}
      {data?.map((value, index) => (
        <Fragment key={`${value}__${index}`}>
          {index != 0 && (
            <div className="border-b border-grey40 dark:border-mediumDarkContrast" />
          )}
          {!isLoading && (
            <div
              className={`flex items-center gap-4 lg:gap-0 break-all ${data.length - 1 === index ? 'mb-2' : ''}`}
            >
              <div className="w-5 lg:w-8">{index + 1}.</div>
              <div className="w-full">
                {searchable && (
                  <div className="flex items-center gap-4">
                    {value}
                    {copyable && <Copy value={value} />}
                  </div>
                )}
                {!searchable && (
                  <div className="flex items-center gap-4 break-all text-sm lg:text-base">
                    {value} {copyable && <Copy value={value} />}
                  </div>
                )}
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  </div>
)

export default NumberedInfoTable

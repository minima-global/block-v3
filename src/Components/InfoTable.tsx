import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'
import Copy from './Copy'

type InfoTableProps = {
  title: string
  isLoading?: boolean
  data: {
    label: string
    value?: string | number | null
    valueClassName?: string
    href?: string
    copyable?: boolean
    ignoreHiddenSpace?: boolean
  }[]
}

const InfoTable: React.FC<InfoTableProps> = ({ title, data, isLoading }) => (
  <div>
    <div className="lg:text-md flex rounded-tl rounded-tr bg-grey20 p-3 px-5 text-sm text-black dark:bg-mediumDarkContrast dark:text-grey80">
      {title}
    </div>
    <div className="flex flex-col gap-4 bg-grey10 p-4 text-black dark:bg-darkContrast dark:text-white">
      {data.map((row, index) => {
        const notFirstRow = index !== 0

        return (
          <Fragment key={row.label}>
            {notFirstRow && (
              <div>
                <div className="border-b border-grey40 dark:border-greyHighlight" />
              </div>
            )}
            <div className="grid flex-grow grid-cols-12 items-center px-1 lg:gap-8">
              <div className="col-span-12 h-full">
                {isLoading && (
                  <div className="skele mb-1.5 h-[40px] text-lightDarkContrast dark:text-grey80">
                    {'‎ '}
                  </div>
                )}
                {!isLoading && (
                  <div className="text-grey60 mb-2 lg:mb-1.5 dark:text-grey80">
                    {row.label}
                  </div>
                )}
                {!isLoading && row.href && (
                  <div className="flex items-center gap-4">
                    <Link
                      to={row.href}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'instant' })
                      }
                      className={`${row.valueClassName} flex items-center gap-4 break-all text-sm lg:text-base`}
                    >
                      {row.value ?? (!row.ignoreHiddenSpace && '‎ ')}
                    </Link>
                    {row.value && row.copyable ? (
                      <Copy value={row.value} />
                    ) : (
                      ''
                    )}
                  </div>
                )}
                {!isLoading && row.value && !row.href && (
                  <div
                    className={`${row.valueClassName ?? ''} flex items-center gap-4`}
                  >
                    <div className="flex items-center gap-4 break-all text-sm lg:text-base">
                      {row.value ?? (!row.ignoreHiddenSpace && '‎ ')}
                    </div>
                    {row.value && row.copyable ? (
                      <Copy value={row.value} />
                    ) : (
                      ''
                    )}
                  </div>
                )}
                {index === data.length - 1 && data.length > 0 && (
                  <div className="mb-2 block lg:mb-2" />
                )}
              </div>
            </div>
          </Fragment>
        )
      })}
    </div>
  </div>
)

export default InfoTable

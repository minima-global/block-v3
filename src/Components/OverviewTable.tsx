import { Fragment } from "react";
import Copy from "./Copy";

type OverviewTableProps = {
  data: {
    title: string;
    value?: string;
    className?: string;
    parentClassName?: string;
    copyable?: boolean;
  }[];
  isLoading?: boolean;
  span?: number;
};

const OverviewTable: React.FC<OverviewTableProps> = ({
  isLoading,
  data,
  span = 6,
}) => {
  const borderIn = 12 / span;

  return (
    <div className="grid grid-cols-12 gap-4 text-black dark:text-white">
      {data.map((row, index) => (
        <Fragment key={row.title}>
          {index !== 0 && (
            <div
              key={`${row.title}-blank-${index}`}
              className={`${row.parentClassName ? row.parentClassName : ""} col-span-12 lg:col-span-6 lg:hidden`}
            >
              <div className="border-b border-grey40 dark:border-greyHighlight" />
            </div>
          )}
          {index !== 0 &&
            index % borderIn === 0 &&
            new Array(borderIn).fill("x").map((_i, index) => (
              <div
                key={`row-${row.title}-blank-${index}`}
                className="col-span-12 hidden lg:col-span-6 lg:block"
              >
                <div className="border-b border-grey40 dark:border-greyHighlight" />
              </div>
            ))}
          <div
            className={`${row.parentClassName ? row.parentClassName : ""} col-span-12 lg:col-span-6`}
          >
            {isLoading && <div className="skele h-[54px] w-full" />}
            {!isLoading && (
              <div>
                <div className="mb-1.5 text-grey60 dark:text-grey80">
                  {row.title}
                </div>
                <div
                  className={`flex items-center gap-4 break-all text-sm lg:text-base ${row.className ?? ""}`}
                >
                  {row.value}
                  {row.copyable && <Copy value={row.value} />}
                </div>
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

// <div className="col-span-6">
//   <div className="text-lightDarkContrast dark:text-grey80">From</div>
//   <div>
//     {transaction.data?.body?.txn.inputs.length} input
//     {transaction.data?.body?.txn.inputs.length &&
//     transaction.data?.body?.txn.inputs.length > 1
//       ? "s"
//       : ""}
//   </div>
// </div>
// <div className="col-span-6">
//   <div className="border-b border-grey40 dark:border-greyHighlight" />
// </div>
// <div className="col-span-6">
//   <div className="border-b border-grey40 dark:border-greyHighlight" />
// </div>
// <div className="col-span-6">
//   <div className="text-lightDarkContrast dark:text-grey80">
//     Total output amount
//   </div>
//   <div>{getTxnAmount(transaction.data?.body)} Minima</div>
// </div>
// <div className="col-span-6">
//   <div className="text-lightDarkContrast dark:text-grey80">To</div>
//   <div>
//     {transaction.data?.body?.txn.outputs.length} output
//     {transaction.data?.body?.txn.outputs.length &&
//     transaction.data?.body?.txn.outputs.length > 1
//       ? "s"
//       : ""}
//   </div>
// </div>
// </div>

export default OverviewTable;

type StatCardProps = {
  icon: JSX.Element;
  title: string;
  value?: string | number | null;
  content?: string | JSX.Element;
  options?: { label: string }[];
  dark?: boolean;
  span?: number;
  mdSpan?: number;
  lgSpan?: number;
  xlSpan?: number;
  isLoading?: boolean;
};

const StatsCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  content = undefined,
  dark = undefined,
  options = undefined,
  span = 4,
  mdSpan = undefined,
  lgSpan = undefined,
  xlSpan = undefined,
  isLoading = false,
}) => (
  <div
    className={`${isLoading ? "skele-manual" : ""} relative overflow-hidden ${!dark ? "bg-grey10 dark:bg-darkContrast" : "bg-grey20 dark:bg-black"} col-span-12 ${mdSpan ? `md:col-span-${mdSpan}` : ``} ${lgSpan ? `lg:col-span-${lgSpan}` : `lg:col-span-${span}`} ${xlSpan ? `xl:col-span-${xlSpan}` : `xl:col-span-${span}`} rounded transition-all`}
  >
    <div className="h-fit p-4 lg:px-4 lg:py-6">
      <div className="flex gap-4 lg:gap-5">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-md bg-white dark:bg-mediumDarkContrast">
          {icon}
        </div>
        <div>
          <div className="text-xs text-black lg:-mt-1 lg:mb-1 lg:text-sm dark:text-grey20">
            {title}
          </div>
          <div className="text-lg text-orange lg:text-xl dark:text-lightOrange">
            {value ?? <>‎ </>}
          </div>
        </div>
        {options && (
          <div className="flex flex-auto justify-end">
            <div className="select relative -mt-2 flex items-center">
              <select className="relative appearance-none rounded-2xl border border-grey40 bg-grey20 p-1.5 pl-3 pr-8 text-sm dark:border-lightDarkContrast dark:bg-mediumDarkContrast">
                {options.map(({ label }) => (
                  <option key={label}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      {content && (
        <>
          <div className="my-3 h-[1px] w-full bg-grey40 dark:bg-mediumDarkContrast"></div>
          <div className="-mb-2 flex items-center gap-2 text-sm">{content}</div>
        </>
      )}
    </div>
  </div>
);

export default StatsCard;

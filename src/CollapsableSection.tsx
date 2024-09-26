import { type PropsWithChildren, useState } from "react";

type CollapsableSectionProps = {
  title: string;
};

const CollapsableSection: React.FC<
  PropsWithChildren<CollapsableSectionProps>
> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    <div>
      <div className="grid w-full grid-cols-2" onClick={toggle}>
        <div className="col-span-1 my-5 block lg:hidden">
          <h5 className="text-xl text-orange dark:text-lightOrange">{title}</h5>
        </div>
        <div className="col-span-1 mr-2 flex items-center justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 transition-all ${!isOpen ? "scale-100 stroke-orange dark:stroke-lightOrange" : "scale-90"}`}
          >
            {isOpen && (
              <>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </>
            )}
            {!isOpen && (
              <>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </>
            )}
          </svg>
        </div>
      </div>
      <div
        className={`w-full transition-all ${isOpen ? "opacity-1 mb-8 h-full" : "pointer-events-none h-0 overflow-hidden opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsableSection;

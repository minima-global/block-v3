type TooltipProps = {
  textContent: number | string;
  right?: boolean;
};

const Tooltip: React.FC<TooltipProps> = ({ textContent, right = false }) => (
  <div
    className={`tooltip overflow absolute hidden w-max pt-1 opacity-0 lg:block ${right ? "tooltip--right" : ""}`}
  >
    <div className="tooltip-content rounded border-darkContrast bg-mediumDarkContrast px-2 py-1 text-white shadow">
      {textContent}
    </div>
  </div>
);

export default Tooltip;

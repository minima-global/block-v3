type ViewLinkProps = {
  label: string;
};

const ViewLink: React.FC<ViewLinkProps> = ({ label }) => (
  <div className="mb-1 flex w-full items-center justify-end gap-3 text-xs hover:text-grey80 lg:mb-0 lg:text-sm">
    {label}
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2918_7235"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2918_7235)">
        <path
          d="M4.97405 14.7036L4.20801 13.9375L12.8459 5.29168H5.11988V4.20834H14.7032V13.7917H13.6199V6.06564L4.97405 14.7036Z"
          fill="currentColor"
        />
      </g>
    </svg>
  </div>
);

export default ViewLink;

type PerPageProps = {
  perPage: number
  setPerPage: (perPage: number) => void
}

const PerPage: React.FC<PerPageProps> = ({ perPage, setPerPage }) => {
  return (
    <div className="flex items-center gap-6 text-sm text-black dark:text-grey40">
      <div className="flex items-center gap-3">
        <div className="select relative">
          <select
            value={perPage}
            className="appearance-none rounded border border-grey80 bg-grey10 py-2 pl-3 pr-10 outline-none dark:border-mediumDarkContrast dark:bg-darkContrast"
            onChange={(evt) => setPerPage(Number(evt.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>Per Page</div>
      </div>
    </div>
  )
}

export default PerPage

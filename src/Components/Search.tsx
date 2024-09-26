import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'

type SearchProps = {
  exisitingValue?: string
  placeholder?: string
  sizing?: 'large'
}

const Search: React.FC<SearchProps> = ({
  exisitingValue,
  placeholder,
  sizing,
}) => {
  const router = useRouter()
  const [query, setQuery] = useState(
    exisitingValue ? String(exisitingValue) : ''
  )

  useEffect(() => {
    if (exisitingValue) {
      setQuery(exisitingValue)
    }
  }, [exisitingValue])

  let sizingClassNames = 'py-2.5 pl-12 pr-10'

  if (sizing === 'large') {
    sizingClassNames = 'py-3 pl-14 pr-14'
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    router.history.push(`/search?q=${encodeURIComponent(String(query))}`)
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <input
        id="q"
        name="q"
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
        placeholder={
          placeholder
            ? placeholder.toString()
            : 'Search Txn ID / Block / Token / Address'
        }
        className={`${sizingClassNames} text-black input relative w-full rounded-full border border-grey40 bg-grey10 text-sm outline-none focus:border-lightDarkContrast dark:border-mediumDarkContrast dark:bg-darkContrast dark:text-white`}
      />
      <div className="input-icon"></div>
      <button
        type="submit"
        className={`input-submit absolute right-2.5 top-0 flex h-full items-center transition-all transition-transform active:scale-90 ${query && exisitingValue !== query ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        <div className="-mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow dark:bg-lightDarkContrast">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </button>
    </form>
  )
}

export default Search

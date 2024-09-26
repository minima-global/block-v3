import { useEffect, useState } from 'react'

type CopyProps = {
  value?: string | number | null
}

const Copy: React.FC<CopyProps> = ({ value }) => {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    if (value) {
      await navigator.clipboard.writeText(value.toString())
      setCopied(true)
    }
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1250)
    }
  }, [copied])

  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="relative cursor-pointer rounded border border-grey40 bg-grey10 from-[#17191C] to-[#37393F] p-1 transition-all hover:border-grey40 hover:bg-grey20 dark:border-lightDarkContrast dark:bg-mediumDarkContrast dark:hover:border-[rgb(83,84,86)] hover:dark:bg-inherit dark:hover:bg-gradient-to-t"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3 stroke-grey dark:stroke-white"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </div>
      <div
        className={`text-black absolute left-[-100%] mt-1 min-w-[64px] select-none rounded px-2 py-0.5 text-center text-xs dark:text-white shadow transition-all dark:bg-mediumDarkContrast ${copied ? 'scale-105 opacity-100' : 'scale-80 opacity-0'}`}
      >
        Copied!
      </div>
    </div>
  )
}

export default Copy

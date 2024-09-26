import { useRouter } from '@tanstack/react-router'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className="dark:text-white flex items-center justify-center min-h-[600px]">
      <div className="text-center">
        <h1 className="text-2xl mb-3">Not found</h1>
        <p className="">Please go back to the previous page</p>
        <button
          onClick={() => router.history.back()}
          className="mt-8 px-8 py-1 border-2 border-black dark:border-white text-sm"
        >
          Go back
        </button>
      </div>
    </div>
  )
}

export default NotFound

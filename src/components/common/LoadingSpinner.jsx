export default function LoadingSpinner({ fullPage = true }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center py-16">
      <Spinner />
    </div>
  )
}

function Spinner() {
  return (
    <div
      className="w-10 h-10 rounded-full border-4 border-neutral-200 border-t-primary-600 animate-spin"
      role="status"
      aria-label="Carregando"
    />
  )
}

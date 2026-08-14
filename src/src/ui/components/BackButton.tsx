import { useNavigate } from 'react-router-dom'

export function BackButton({ to = '/menu' }: { to?: string }) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      aria-label="Kembali"
      onClick={() => {

        navigate(to)
      }}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-xl text-text shadow-sm transition-colors hover:bg-paper-3 active:scale-95"
    >
      ←
    </button>
  )
}
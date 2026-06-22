import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-lingo-surface flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
              <span className="text-xl font-bold text-lingo-navy">PM-Lingo</span>
              <span className="w-2 h-2 rounded-full bg-lingo-red" />
            </Link>
            <h1 className="text-2xl font-bold text-lingo-navy">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue learning</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link href="#" className="text-lingo-red hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-lingo-red font-medium hover:underline">Start free trial</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

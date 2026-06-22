import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-lingo-surface flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
              <span className="text-xl font-bold text-lingo-navy">PM-Lingo</span>
              <span className="w-2 h-2 rounded-full bg-lingo-red" />
            </Link>
            <h1 className="text-2xl font-bold text-lingo-navy">Start your free trial</h1>
            <p className="text-gray-500 text-sm mt-1">14 days free · No credit card required</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors"
              />
            </div>
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
                placeholder="At least 8 characters"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {['Student', 'Teacher'].map((role) => (
                  <label key={role} className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-lingo-red transition-colors text-sm">
                    <input type="radio" name="role" value={role.toLowerCase()} className="text-lingo-red" />
                    {role}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Create account
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            By signing up you agree to our{' '}
            <Link href="/terms" className="underline">Terms</Link> and{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-lingo-red font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

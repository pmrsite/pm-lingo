export const metadata = { title: 'Contact — PM-Lingo' }

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-lingo-navy mb-4">Contact us</h1>
        <p className="text-gray-500">Have a question? We would love to hear from you.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
            <input type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors">
              <option>General enquiry</option>
              <option>Technical support</option>
              <option>Billing</option>
              <option>Teacher application</option>
              <option>Partnership</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
            <textarea rows={5} placeholder="Tell us how we can help..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red transition-colors resize-none" />
          </div>
          <button type="submit" className="w-full bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold py-3 rounded-xl transition-colors">
            Send message
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">Or email us directly at <a href="mailto:hello@pm-lingo.com" className="text-lingo-red hover:underline">hello@pm-lingo.com</a></p>
        </div>
      </div>
    </div>
  )
}

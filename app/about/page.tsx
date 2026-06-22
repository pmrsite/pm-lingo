export const metadata = { title: 'About — PM-Lingo' }

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-lingo-navy mb-4">About PM-Lingo</h1>
        <p className="text-xl text-gray-500">We believe Chinese should be learned through real-life experience, not textbook repetition.</p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <div className="bg-lingo-surface rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-lingo-navy mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            PM-Lingo was built for international learners who need practical Chinese — not academic Chinese. Whether you are travelling to China, working with Chinese colleagues, or building relationships in Chinese-speaking communities, we help you communicate with confidence in real situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '50', label: 'Real-life missions' },
            { num: '4', label: 'AI teacher personalities' },
            { num: '14', label: 'Days free trial' },
          ].map((s) => (
            <div key={s.label} className="text-center bg-white border border-gray-100 rounded-2xl p-8">
              <div className="text-4xl font-bold text-lingo-red mb-2">{s.num}</div>
              <div className="text-gray-600 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-lingo-navy text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Why mission-based learning?</h2>
          <p className="text-gray-300 leading-relaxed">
            Traditional language courses teach grammar rules first and hope students eventually use them. PM-Lingo flips this: we start with the situation — ordering food, taking a taxi, finding a toilet — and teach you exactly what you need to succeed in that moment. Grammar becomes a tool, not an obstacle.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-lingo-navy mb-6">Built by PM Resources</h2>
          <p className="text-gray-600 leading-relaxed">
            PM-Lingo is developed by PM Resources, a training and education company based in Malaysia. With years of experience delivering professional training across Southeast Asia, we understand what practical learning looks like. PM-Lingo is our answer to the question: what if language learning was as focused and results-driven as professional training?
          </p>
        </div>
      </div>
    </div>
  )
}

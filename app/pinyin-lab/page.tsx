export const metadata = { title: 'Smart Pinyin Lab — PM-Lingo' }

const initials = ['b','p','m','f','d','t','n','l','g','k','h','j','q','x','zh','ch','sh','r','z','c','s','y','w']
const finals = ['a','o','e','i','u','ü','ai','ei','ui','ao','ou','iu','ie','üe','er','an','en','in','un','ün','ang','eng','ing','ong']
const tones = [
  { mark: 'ā / á / ǎ / à', number: '1st / 2nd / 3rd / 4th', description: 'High level / Rising / Dipping / Falling', example: 'mā (妈 mother) / má (麻 hemp) / mǎ (马 horse) / mà (骂 scold)' },
]

export default function PinyinLabPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-lingo-red/10 text-lingo-red text-sm px-3 py-1 rounded-full mb-4 font-medium">
          Smart Pinyin Lab
        </div>
        <h1 className="text-4xl font-bold text-lingo-navy mb-4">Master Mandarin Pronunciation</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Pinyin is the phonetic system for Standard Chinese. Learn initials, finals, and tones to unlock correct pronunciation.
        </p>
      </div>

      {/* Tones */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-lingo-navy mb-6">The Four Tones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { tone: '1st Tone', mark: 'ā', desc: 'High and level. Hold it steady.', color: 'bg-blue-50 border-blue-200 text-blue-700', example: 'mā 妈 (mother)' },
            { tone: '2nd Tone', mark: 'á', desc: 'Rising. Like asking a question.', color: 'bg-green-50 border-green-200 text-green-700', example: 'má 麻 (hemp)' },
            { tone: '3rd Tone', mark: 'ǎ', desc: 'Dipping. Falls then rises.', color: 'bg-yellow-50 border-yellow-200 text-yellow-700', example: 'mǎ 马 (horse)' },
            { tone: '4th Tone', mark: 'à', desc: 'Falling. Short and sharp.', color: 'bg-red-50 border-red-200 text-red-700', example: 'mà 骂 (to scold)' },
          ].map((t) => (
            <div key={t.tone} className={`rounded-2xl border p-6 ${t.color}`}>
              <div className="text-4xl font-bold mb-2">{t.mark}</div>
              <div className="font-semibold text-sm mb-1">{t.tone}</div>
              <p className="text-xs mb-3 opacity-80">{t.desc}</p>
              <div className="text-xs font-medium opacity-70">{t.example}</div>
              <button className="mt-3 bg-white/60 hover:bg-white/90 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors w-full">
                🔊 Play audio (coming soon)
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Initials */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-lingo-navy mb-2">Initials (声母)</h2>
        <p className="text-gray-500 text-sm mb-6">The consonant sounds that begin a syllable. There are 23 initials in Mandarin.</p>
        <div className="flex flex-wrap gap-3">
          {initials.map((i) => (
            <div key={i} className="bg-lingo-surface border border-gray-200 rounded-xl px-4 py-3 text-center min-w-[56px]">
              <div className="text-lg font-bold text-lingo-navy">{i}</div>
              <button className="text-xs text-gray-400 hover:text-lingo-red transition-colors mt-1">🔊</button>
            </div>
          ))}
        </div>
      </section>

      {/* Finals */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-lingo-navy mb-2">Finals (韵母)</h2>
        <p className="text-gray-500 text-sm mb-6">The vowel sounds (and endings) of a syllable. Finals follow initials to form complete syllables.</p>
        <div className="flex flex-wrap gap-3">
          {finals.map((f) => (
            <div key={f} className="bg-lingo-surface border border-gray-200 rounded-xl px-4 py-3 text-center min-w-[56px]">
              <div className="text-lg font-bold text-lingo-navy">{f}</div>
              <button className="text-xs text-gray-400 hover:text-lingo-red transition-colors mt-1">🔊</button>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-lingo-navy rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Pronunciation Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { tip: 'Tones change meaning', detail: '妈 (mā), 马 (mǎ), 骂 (mà) are three completely different words. Tones are not optional.' },
            { tip: 'x, q, j are unique', detail: 'These sounds don\'t exist in English. x = like "sh" but forward, q = like "ch" but lighter, j = like "j" but with more tension.' },
            { tip: 'zh, ch, sh, r are retroflex', detail: 'Curl your tongue back to make these sounds. They sound similar to z, c, s but with a "thick" quality.' },
            { tip: 'Practice neutral tone (5th tone)', detail: 'Some syllables are unstressed and short. 吗 (ma), 呢 (ne), 的 (de) are always in neutral tone.' },
          ].map((t) => (
            <div key={t.tip}>
              <h3 className="font-semibold text-lingo-red mb-1">{t.tip}</h3>
              <p className="text-gray-300 text-sm">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

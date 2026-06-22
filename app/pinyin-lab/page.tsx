'use client'

import { useState } from 'react'

const INITIALS = ['', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's']

const FINAL_GROUPS = [
  { label: 'Simple Finals', finals: ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er'] },
  { label: 'i- Finals', finals: ['i', 'ia', 'iao', 'ie', 'iu', 'ian', 'in', 'iang', 'ing', 'iong'] },
  { label: 'u- Finals', finals: ['u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang'] },
  { label: 'ü- Finals', finals: ['ü', 'üe', 'üan', 'ün'] },
]

const STANDALONE: Record<string, string> = {
  'i': 'yi', 'ia': 'ya', 'iao': 'yao', 'ie': 'ye', 'iu': 'you',
  'ian': 'yan', 'in': 'yin', 'iang': 'yang', 'ing': 'ying', 'iong': 'yong',
  'u': 'wu', 'ua': 'wa', 'uo': 'wo', 'uai': 'wai', 'ui': 'wei',
  'uan': 'wan', 'un': 'wen', 'uang': 'wang',
  'ü': 'yu', 'üe': 'yue', 'üan': 'yuan', 'ün': 'yun',
}

const VALID = new Set([
  'a','o','e','ai','ei','ao','ou','an','en','ang','eng','er',
  'yi','ya','yao','ye','you','yan','yin','yang','ying','yong',
  'wu','wa','wo','wai','wei','wan','wen','wang',
  'yu','yue','yuan','yun',
  'ba','bo','bai','bei','bao','ban','ben','bang','beng','bi','bie','biao','bian','bin','bing','bu',
  'pa','po','pai','pei','pao','pou','pan','pen','pang','peng','pi','pie','piao','pian','pin','ping','pu',
  'ma','mo','me','mai','mei','mao','mou','man','men','mang','meng','mi','mie','miao','miu','mian','min','ming','mu',
  'fa','fo','fei','fou','fan','fen','fang','feng','fu',
  'da','de','dai','dei','dao','dou','dan','den','dang','deng','di','dia','die','diao','diu','dian','ding','dong','du','duan','dui','dun','duo',
  'ta','te','tai','tao','tou','tan','tang','teng','ti','tie','tiao','tian','ting','tong','tu','tuan','tui','tun','tuo',
  'na','ne','nai','nei','nao','nou','nan','nen','nang','neng','ni','nie','niao','niu','nian','nin','niang','ning','nong','nu','nuan','nuo','nü','nüe',
  'la','lo','le','lai','lei','lao','lou','lan','lang','leng','li','lia','lie','liao','liu','lian','lin','liang','ling','long','lu','luan','lun','luo','lü','lüe',
  'ga','ge','gai','gei','gao','gou','gan','gen','gang','geng','gong','gu','gua','guai','guan','guang','gui','gun','guo',
  'ka','ke','kai','kei','kao','kou','kan','ken','kang','keng','kong','ku','kua','kuai','kuan','kuang','kui','kun','kuo',
  'ha','he','hai','hei','hao','hou','han','hen','hang','heng','hong','hu','hua','huai','huan','huang','hui','hun','huo',
  'ji','jia','jie','jiao','jiu','jian','jin','jiang','jing','jiong','ju','jue','juan','jun',
  'qi','qia','qie','qiao','qiu','qian','qin','qiang','qing','qiong','qu','que','quan','qun',
  'xi','xia','xie','xiao','xiu','xian','xin','xiang','xing','xiong','xu','xue','xuan','xun',
  'zha','zhe','zhi','zhao','zhou','zhan','zhen','zhang','zheng','zhong','zhu','zhua','zhuai','zhuan','zhuang','zhui','zhun','zhuo',
  'cha','che','chi','chao','chou','chan','chen','chang','cheng','chong','chu','chua','chuai','chuan','chuang','chui','chun','chuo',
  'sha','she','shi','shao','shou','shan','shen','shang','sheng','shu','shua','shuai','shuan','shuang','shui','shun','shuo',
  're','ri','rao','rou','ran','ren','rang','reng','rong','ru','rua','ruan','rui','run','ruo',
  'za','ze','zi','zao','zou','zan','zen','zang','zeng','zong','zu','zuan','zui','zun','zuo',
  'ca','ce','ci','cao','cou','can','cen','cang','ceng','cong','cu','cuan','cui','cun','cuo',
  'sa','se','si','sao','sou','san','sen','sang','seng','song','su','suan','sui','sun','suo',
])

function getSyllable(initial: string, final: string): string | null {
  if (initial === '') {
    const standalone = STANDALONE[final] ?? final
    return VALID.has(standalone) ? standalone : null
  }
  let f = final
  if (['j', 'q', 'x'].includes(initial)) {
    f = f.replace('ü', 'u')
  }
  const syllable = initial + f
  return VALID.has(syllable) ? syllable : null
}

const TONE_VOWELS: Record<string, string[]> = {
  'a': ['ā','á','ǎ','à','a'],
  'e': ['ē','é','ě','è','e'],
  'i': ['ī','í','ǐ','ì','i'],
  'o': ['ō','ó','ǒ','ò','o'],
  'u': ['ū','ú','ǔ','ù','u'],
  'ü': ['ǖ','ǘ','ǚ','ǜ','ü'],
}

function addTone(syllable: string, tone: number): string {
  if (tone === 0) return syllable
  const idx = tone - 1
  if (syllable.includes('a')) return syllable.replace('a', TONE_VOWELS['a'][idx])
  if (syllable.includes('e')) return syllable.replace('e', TONE_VOWELS['e'][idx])
  if (syllable.includes('ou')) return syllable.replace('o', TONE_VOWELS['o'][idx])
  for (let i = syllable.length - 1; i >= 0; i--) {
    const c = syllable[i]
    if (TONE_VOWELS[c]) {
      return syllable.substring(0, i) + TONE_VOWELS[c][idx] + syllable.substring(i + 1)
    }
  }
  return syllable
}

function speak(syllable: string, tone: number) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const withTone = addTone(syllable, tone)
  const utter = new SpeechSynthesisUtterance(withTone)
  utter.lang = 'zh-CN'
  utter.rate = 0.7
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}

const TONE_LABELS = ['1st — flat (ā)', '2nd — rising (á)', '3rd — dipping (ǎ)', '4th — falling (à)', 'Neutral (a)']
const TONE_EXAMPLES = ['ā','á','ǎ','à','a']

export default function PinyinLabPage() {
  const [tone, setTone] = useState(1)
  const [active, setActive] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const handleCell = (syllable: string) => {
    setActive(syllable)
    speak(syllable, tone)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-lingo-navy text-white py-14 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-lingo-red/20 border border-lingo-red/30 text-lingo-red text-xs font-semibold px-3 py-1 rounded-full mb-4">
          🎵 Interactive Audio Chart
        </div>
        <h1 className="text-4xl font-bold mb-3">Pinyin Chart</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-sm leading-relaxed">
          Click any syllable to hear it pronounced. Select a tone to hear all 4 tones.
          Master all 400+ sounds of Mandarin Chinese.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-lingo-surface rounded-xl border border-lingo-border">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <svg className="w-4 h-4 text-lingo-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search pinyin (e.g. ma, zhi, juan)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-lingo-text placeholder-lingo-muted focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-lingo-muted hover:text-lingo-text text-xs">✕</button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lingo-muted font-medium uppercase tracking-wide">Tone:</span>
            {[1, 2, 3, 4, 0].map(t => (
              <button
                key={t}
                onClick={() => setTone(t)}
                title={TONE_LABELS[t === 0 ? 4 : t - 1]}
                className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                  tone === t
                    ? 'bg-lingo-red text-white shadow-md scale-110'
                    : 'bg-white border border-lingo-border text-lingo-muted hover:border-lingo-red hover:text-lingo-red'
                }`}
              >
                {t === 0 ? '·' : TONE_EXAMPLES[t - 1]}
              </button>
            ))}
            <span className="text-xs text-lingo-muted hidden sm:block">{TONE_LABELS[tone === 0 ? 4 : tone - 1]}</span>
          </div>
        </div>

        {/* Active syllable display */}
        {active && (
          <div className="mb-4 flex items-center gap-3 p-3 bg-lingo-red/5 border border-lingo-red/20 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-lingo-red flex items-center justify-center text-white text-xl font-bold">
              🔊
            </div>
            <div>
              <div className="text-2xl font-bold text-lingo-text">{addTone(active, tone)}</div>
              <div className="text-xs text-lingo-muted">Click any cell to hear a different syllable</div>
            </div>
            <button
              onClick={() => speak(active, tone)}
              className="ml-auto px-4 py-2 bg-lingo-red text-white text-sm font-semibold rounded-lg hover:bg-lingo-red-dark transition-colors"
            >
              Replay
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-lingo-border shadow-sm">
          <table className="border-collapse text-sm" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                <th className="bg-lingo-navy text-white px-3 py-3 text-center font-semibold sticky left-0 z-20 min-w-[72px] text-xs">
                  <span className="block text-gray-400 text-[10px]">final ↓</span>
                  <span className="block text-gray-400 text-[10px]">initial →</span>
                </th>
                {INITIALS.map(initial => (
                  <th key={initial || 'zero'} className="bg-lingo-navy text-white px-2 py-3 text-center font-bold min-w-[54px] text-sm">
                    {initial || '∅'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FINAL_GROUPS.map((group, gi) => (
                <>
                  <tr key={`group-${gi}`}>
                    <td
                      colSpan={INITIALS.length + 1}
                      className="bg-lingo-red/10 text-lingo-red text-[11px] font-bold px-4 py-1.5 uppercase tracking-widest"
                    >
                      {group.label}
                    </td>
                  </tr>
                  {group.finals.map((final, fi) => (
                    <tr key={final} className={fi % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                      <td className="sticky left-0 z-10 bg-lingo-navy text-white px-2 py-1.5 text-center font-bold text-xs min-w-[72px]">
                        {final}
                      </td>
                      {INITIALS.map(initial => {
                        const syllable = getSyllable(initial, final)
                        const isMatch = search.length > 0 && syllable !== null && syllable.toLowerCase().startsWith(search.toLowerCase())
                        const isActive = syllable === active
                        return (
                          <td key={initial || 'zero'} className="px-0.5 py-0.5 text-center">
                            {syllable ? (
                              <button
                                onClick={() => handleCell(syllable)}
                                className={`w-full px-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                                  isActive
                                    ? 'bg-lingo-red text-white shadow-lg ring-2 ring-lingo-red/30'
                                    : isMatch
                                    ? 'bg-yellow-100 text-yellow-900 ring-2 ring-yellow-400 shadow-sm'
                                    : 'bg-lingo-surface text-lingo-text hover:bg-lingo-red hover:text-white hover:shadow-md'
                                }`}
                              >
                                {addTone(syllable, tone)}
                              </button>
                            ) : (
                              <span className="block py-2 text-gray-200 text-xs">—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-6 text-xs text-lingo-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded bg-lingo-surface border border-lingo-border"></span>
            Valid — click to hear
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded bg-lingo-red"></span>
            Currently selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-400"></span>
            Search match
          </span>
          <span className="flex items-center gap-1.5 text-gray-300">— Not a valid combination</span>
        </div>

        {/* Tone guide */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { tone: 1, mark: 'ā', name: '1st Tone', desc: 'High and flat', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { tone: 2, mark: 'á', name: '2nd Tone', desc: 'Rising pitch', color: 'bg-green-50 border-green-200 text-green-700' },
            { tone: 3, mark: 'ǎ', name: '3rd Tone', desc: 'Dipping then rising', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
            { tone: 4, mark: 'à', name: '4th Tone', desc: 'Sharp falling', color: 'bg-red-50 border-red-200 text-red-700' },
            { tone: 0, mark: 'a', name: 'Neutral', desc: 'Short and light', color: 'bg-gray-50 border-gray-200 text-gray-600' },
          ].map(({ tone: t, mark, name, desc, color }) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                tone === t ? color + ' shadow-md scale-105' : 'bg-white border-lingo-border hover:border-lingo-red'
              }`}
            >
              <div className={`text-2xl font-bold mb-1 ${tone === t ? '' : 'text-lingo-text'}`}>{mark}</div>
              <div className={`text-sm font-semibold ${tone === t ? '' : 'text-lingo-text'}`}>{name}</div>
              <div className={`text-xs mt-0.5 ${tone === t ? 'opacity-80' : 'text-lingo-muted'}`}>{desc}</div>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-lingo-text mb-2">What is Pinyin?</h2>
          <p className="text-lingo-muted leading-relaxed mb-4">
            Pīnyīn (拼音) literally means &ldquo;spell-sounds&rdquo; in Chinese. It&apos;s the standard system for
            transcribing Mandarin Chinese sounds using the Latin alphabet — the same one you already know.
          </p>
          <p className="text-lingo-muted leading-relaxed mb-4">
            Every sound in Mandarin fits into this chart. Master these ~400 combinations plus the four tones,
            and you&apos;ve effectively mastered the pronunciation of every word in the Chinese language.
          </p>
          <p className="text-lingo-muted leading-relaxed">
            Good news: if you know English, you already know how to pronounce more than half of these sounds correctly.
            The rest just need a little practice — that&apos;s exactly what this chart is for.
          </p>
        </div>
      </div>
    </div>
  )
}

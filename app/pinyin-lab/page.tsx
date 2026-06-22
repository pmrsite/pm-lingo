'use client'

import { useState, useEffect, useRef } from 'react'

const INITIALS = ['', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's']

const FINAL_GROUPS = [
  { label: 'Simple Finals', finals: ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er'] },
  { label: 'i- Finals', finals: ['i', 'ia', 'iao', 'ie', 'iu', 'ian', 'in', 'iang', 'ing', 'iong'] },
  { label: 'u- Finals', finals: ['u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang'] },
  { label: 'ü- Finals', finals: ['ü', 'üe', 'üan', 'ün'] },
]

const ALL_FINALS = FINAL_GROUPS.flatMap(g => g.finals)

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
  if (['j', 'q', 'x'].includes(initial)) f = f.replace('ü', 'u')
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
    if (TONE_VOWELS[c]) return syllable.substring(0, i) + TONE_VOWELS[c][idx] + syllable.substring(i + 1)
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

const TONE_INFO = [
  { tone: 1, mark: 'ā', name: '1st Tone', desc: 'High & flat', symbol: '—', color: 'bg-blue-500', light: 'bg-blue-50 border-blue-300 text-blue-700' },
  { tone: 2, mark: 'á', name: '2nd Tone', desc: 'Rising', symbol: '↗', color: 'bg-green-500', light: 'bg-green-50 border-green-300 text-green-700' },
  { tone: 3, mark: 'ǎ', name: '3rd Tone', desc: 'Dip & rise', symbol: '↘↗', color: 'bg-yellow-500', light: 'bg-yellow-50 border-yellow-300 text-yellow-700' },
  { tone: 4, mark: 'à', name: '4th Tone', desc: 'Sharp fall', symbol: '↘', color: 'bg-red-500', light: 'bg-red-50 border-red-300 text-red-700' },
  { tone: 0, mark: 'a', name: 'Neutral', desc: 'Short & light', symbol: '·', color: 'bg-gray-400', light: 'bg-gray-50 border-gray-300 text-gray-600' },
]

interface PopupState {
  syllable: string
  finalIdx: number
  initialIdx: number
}

export default function PinyinLabPage() {
  const [selectedTone, setSelectedTone] = useState(1)
  const [hoverFinal, setHoverFinal] = useState<string | null>(null)
  const [hoverInitial, setHoverInitial] = useState<string | null>(null)
  const [popup, setPopup] = useState<PopupState | null>(null)
  const [playingTone, setPlayingTone] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopup(null)
      }
    }
    if (popup) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [popup])

  function handleCellClick(syllable: string, finalIdx: number, initialIdx: number) {
    setPopup({ syllable, finalIdx, initialIdx })
    speak(syllable, selectedTone)
    setPlayingTone(selectedTone)
  }

  function handlePopupTone(syllable: string, tone: number) {
    speak(syllable, tone)
    setPlayingTone(tone)
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
          Hover any cell to highlight its initial and final. Click to hear all 4 tones in a popup.
          Built on your browser&apos;s Chinese voice — no plugins needed.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">

        {/* Controls bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-lingo-surface rounded-xl border border-lingo-border">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <svg className="w-4 h-4 text-lingo-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search pinyin (e.g. ma, zhi, juan)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-lingo-text placeholder-lingo-muted focus:outline-none"
            />
            {search && <button onClick={() => setSearch('')} className="text-lingo-muted hover:text-lingo-text text-xs">✕</button>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lingo-muted font-medium">Default tone:</span>
            {TONE_INFO.map(({ tone, mark, name }) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                title={name}
                className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                  selectedTone === tone
                    ? 'bg-lingo-red text-white shadow-md scale-110'
                    : 'bg-white border border-lingo-border text-lingo-muted hover:border-lingo-red hover:text-lingo-red'
                }`}
              >
                {mark}
              </button>
            ))}
          </div>
        </div>

        {/* Table wrapper — relative so popup can position inside */}
        <div className="relative">
          <div className="overflow-x-auto rounded-xl border border-lingo-border shadow-sm">
            <table className="border-collapse text-sm" style={{ minWidth: '980px' }}>
              <thead>
                <tr>
                  <th className="bg-lingo-navy text-white px-3 py-3 text-center sticky left-0 z-20 min-w-[72px]">
                    <span className="block text-gray-400 text-[10px]">final ↓</span>
                    <span className="block text-gray-400 text-[10px]">initial →</span>
                  </th>
                  {INITIALS.map((initial, ci) => (
                    <th
                      key={initial || 'zero'}
                      className={`px-2 py-3 text-center font-bold min-w-[54px] text-sm transition-colors ${
                        hoverInitial === initial
                          ? 'bg-lingo-red text-white'
                          : 'bg-lingo-navy text-white'
                      }`}
                    >
                      {initial || '∅'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FINAL_GROUPS.map((group, gi) => (
                  <>
                    <tr key={`group-${gi}`}>
                      <td colSpan={INITIALS.length + 1} className="bg-lingo-red/10 text-lingo-red text-[11px] font-bold px-4 py-1.5 uppercase tracking-widest">
                        {group.label}
                      </td>
                    </tr>
                    {group.finals.map((final, fi) => {
                      const finalIdx = ALL_FINALS.indexOf(final)
                      return (
                        <tr key={final} className={fi % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                          <td
                            className={`sticky left-0 z-10 px-2 py-1.5 text-center font-bold text-xs min-w-[72px] transition-colors ${
                              hoverFinal === final
                                ? 'bg-lingo-red text-white'
                                : 'bg-lingo-navy text-white'
                            }`}
                          >
                            {final}
                          </td>
                          {INITIALS.map((initial, ci) => {
                            const syllable = getSyllable(initial, final)
                            const isRowHighlight = hoverFinal === final
                            const isColHighlight = hoverInitial === initial
                            const isActive = popup?.syllable === syllable && syllable !== null
                            const isMatch = search.length > 0 && syllable !== null && syllable.toLowerCase().startsWith(search.toLowerCase())
                            return (
                              <td
                                key={initial || 'zero'}
                                className={`px-0.5 py-0.5 text-center transition-colors ${
                                  (isRowHighlight || isColHighlight) && syllable ? 'bg-lingo-navy/5' : ''
                                }`}
                              >
                                {syllable ? (
                                  <button
                                    onMouseEnter={() => { setHoverFinal(final); setHoverInitial(initial) }}
                                    onMouseLeave={() => { setHoverFinal(null); setHoverInitial(null) }}
                                    onClick={() => handleCellClick(syllable, finalIdx, ci)}
                                    className={`w-full px-1 py-2 rounded-lg text-xs font-semibold transition-all duration-100 hover:scale-105 active:scale-95 ${
                                      isActive
                                        ? 'bg-lingo-red text-white shadow-lg ring-2 ring-lingo-red/40'
                                        : isMatch
                                        ? 'bg-yellow-100 text-yellow-900 ring-2 ring-yellow-400'
                                        : (isRowHighlight || isColHighlight)
                                        ? 'bg-lingo-navy text-white'
                                        : 'bg-lingo-surface text-lingo-text hover:bg-lingo-red hover:text-white'
                                    }`}
                                  >
                                    {addTone(syllable, selectedTone)}
                                  </button>
                                ) : (
                                  <span
                                    className={`block py-2 text-xs ${
                                      (isRowHighlight || isColHighlight) ? 'text-lingo-navy/20' : 'text-gray-200'
                                    }`}
                                  >
                                    —
                                  </span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Popup */}
          {popup && (
            <div
              ref={popupRef}
              className="absolute z-50 bg-white rounded-2xl shadow-2xl border border-lingo-border p-6 w-80"
              style={{ top: 16, right: 16 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-lingo-text">{popup.syllable}</div>
                  <div className="text-xs text-lingo-muted mt-0.5">Click a tone to hear it</div>
                </div>
                <button
                  onClick={() => setPopup(null)}
                  className="text-lingo-muted hover:text-lingo-text text-lg leading-none p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {TONE_INFO.map(({ tone, name, desc, symbol, light }) => {
                  const withTone = addTone(popup.syllable, tone)
                  const isPlaying = playingTone === tone
                  return (
                    <button
                      key={tone}
                      onClick={() => handlePopupTone(popup.syllable, tone)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                        isPlaying ? light + ' shadow-md' : 'border-lingo-border bg-lingo-surface hover:border-lingo-red/40'
                      }`}
                    >
                      <span className="text-lg w-6 text-center shrink-0">{symbol}</span>
                      <span className="text-2xl font-bold flex-1 text-left">{withTone}</span>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-lingo-text">{name}</div>
                        <div className="text-[10px] text-lingo-muted">{desc}</div>
                      </div>
                      <span className="text-lingo-muted">{isPlaying ? '🔊' : '▶️'}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-lingo-border text-[11px] text-lingo-muted text-center">
                Audio via browser Chinese TTS (zh-CN)
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-6 text-xs text-lingo-muted">
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded bg-lingo-surface border border-lingo-border"></span>Valid — click for tones</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded bg-lingo-navy"></span>Cross-highlight on hover</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded bg-lingo-red"></span>Selected</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-400"></span>Search match</span>
        </div>

        {/* Tone guide */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {TONE_INFO.map(({ tone, mark, name, desc, light }) => (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                selectedTone === tone ? light + ' shadow-md scale-105' : 'bg-white border-lingo-border hover:border-lingo-red'
              }`}
            >
              <div className="text-2xl font-bold mb-1 text-lingo-text">{mark}</div>
              <div className="text-sm font-semibold text-lingo-text">{name}</div>
              <div className="text-xs mt-0.5 text-lingo-muted">{desc}</div>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-lingo-text mb-2">What is Pinyin?</h2>
          <p className="text-lingo-muted leading-relaxed mb-4">
            Pīyīn (拼音) literally means &ldquo;spell-sounds&rdquo; in Chinese. It&apos;s the standard system for
            transcribing Mandarin Chinese sounds using the Latin alphabet.
          </p>
          <p className="text-lingo-muted leading-relaxed">
            Every sound in Mandarin fits into this chart. Master these ~400 combinations plus the four tones,
            and you&apos;ve effectively mastered the pronunciation of every word in the Chinese language.
          </p>
        </div>
      </div>
    </div>
  )
}

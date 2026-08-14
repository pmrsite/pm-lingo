'use client'

import { useState, useEffect, useRef } from 'react'
import WaveDivider from '@/components/ui/WaveDivider'
import Link from 'next/link'

const TEAL   = '#0F766E'
const ORANGE = '#FF6B00'

const INITIALS = ['', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's']

const FINAL_GROUPS = [
  { label: 'Simple Finals', finals: ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er'] },
  { label: 'i- Finals',     finals: ['i', 'ia', 'iao', 'ie', 'iu', 'ian', 'in', 'iang', 'ing', 'iong'] },
  { label: 'u- Finals',     finals: ['u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang'] },
  { label: 'ü- Finals',    finals: ['ü', 'üe', 'üan', 'ün'] },
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
  { tone: 1, mark: 'ā', name: '1st Tone', desc: 'High & flat',  symbol: '—',  light: 'bg-blue-50 border-blue-300 text-blue-700' },
  { tone: 2, mark: 'á', name: '2nd Tone', desc: 'Rising',       symbol: '↗',  light: 'bg-green-50 border-green-300 text-green-700' },
  { tone: 3, mark: 'ǎ', name: '3rd Tone', desc: 'Dip & rise',   symbol: '↘↗', light: 'bg-yellow-50 border-yellow-300 text-yellow-700' },
  { tone: 4, mark: 'à', name: '4th Tone', desc: 'Sharp fall',   symbol: '↘',  light: 'bg-red-50 border-red-300 text-red-700' },
  { tone: 0, mark: 'a',      name: 'Neutral',  desc: 'Short & light', symbol: '·', light: 'bg-gray-50 border-gray-300 text-gray-600' },
]

interface PopupState { syllable: string }

export default function PinyinLabPage() {
  const [selectedTone, setSelectedTone] = useState(1)
  const [hoverFinal,   setHoverFinal]   = useState<string | null>(null)
  const [hoverInitial, setHoverInitial] = useState<string | null>(null)
  const [popup,        setPopup]        = useState<PopupState | null>(null)
  const [playingTone,  setPlayingTone]  = useState<number | null>(null)
  const [search,       setSearch]       = useState('')
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) setPopup(null)
    }
    if (popup) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [popup])

  function handleCellClick(syllable: string) {
    setPopup({ syllable })
    speak(syllable, selectedTone)
    setPlayingTone(selectedTone)
  }

  function handlePopupTone(syllable: string, tone: number) {
    speak(syllable, tone)
    setPlayingTone(tone)
  }

  // ── Colour helpers ────────────────────────────────────────────────────────
  // header: teal by default; orange when it is part of the active cross
  function headerBg(key: string, activeKey: string | null) {
    return key === activeKey ? ORANGE : TEAL
  }

  // td background for empty (—) cells that fall in the cross
  function tdBg(final: string, initial: string): string | undefined {
    const isIntersection = hoverFinal === final && hoverInitial === initial
    const isCross        = hoverFinal === final || hoverInitial === initial
    if (isIntersection) return TEAL
    if (isCross)        return ORANGE
    return undefined
  }

  // button style object for a valid syllable cell
  function btnStyle(final: string, initial: string, syllable: string, isMatch: boolean) {
    const isIntersection = hoverFinal === final && hoverInitial === initial
    const isCross        = hoverFinal === final || hoverInitial === initial
    const isActive       = popup?.syllable === syllable

    if (isIntersection) return { backgroundColor: TEAL,   color: '#ffffff' }
    if (isCross)        return { backgroundColor: ORANGE, color: '#ffffff' }
    if (isActive)       return { backgroundColor: TEAL,   color: '#ffffff' }
    if (isMatch)        return {} // handled by className
    return {}
  }

  function btnClass(final: string, initial: string, syllable: string, isMatch: boolean) {
    const isIntersection = hoverFinal === final && hoverInitial === initial
    const isCross        = hoverFinal === final || hoverInitial === initial
    const isActive       = popup?.syllable === syllable
    const base = 'w-full px-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ease-out hover:scale-105 active:scale-95'
    if (isIntersection || isCross || isActive) return base
    if (isMatch) return base + ' bg-yellow-100 text-yellow-900 ring-2 ring-yellow-400'
    return base + ' bg-lingo-surface text-lingo-text hover:bg-lingo-teal hover:text-white'
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-20 pb-12 px-4 text-center" style={{ backgroundColor: TEAL }}>
        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
          🎵 Interactive Audio Chart
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">
          <span style={{ color: ORANGE }}>Mandarin</span> Pinyin Chart
        </h1>
        <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">
          Hover any cell to highlight its row and column. Click to hear all 4 tones.
        </p>
      </section>

      <WaveDivider variant="teal-to-white" shape="arch" />

      <div className="max-w-[1400px] mx-auto px-4 py-8">

        {/* Search + tone selector */}
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
                    ? 'text-white shadow-md scale-110'
                    : 'bg-white border border-lingo-border text-lingo-muted hover:border-lingo-red hover:text-lingo-red'
                }`}
                style={selectedTone === tone ? { backgroundColor: ORANGE } : undefined}
              >
                {mark}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          <div className="overflow-x-auto rounded-xl border border-lingo-border shadow-sm">
            <table className="border-collapse text-sm" style={{ minWidth: '980px' }}>
              <thead>
                <tr>
                  {/* corner cell */}
                  <th
                    className="px-3 py-3 text-center sticky left-0 z-20 min-w-[72px]"
                    style={{ backgroundColor: TEAL, color: 'white' }}
                  >
                    <span className="block text-gray-200 text-[10px]">final ↓</span>
                    <span className="block text-gray-200 text-[10px]">initial →</span>
                  </th>
                  {/* initial column headers */}
                  {INITIALS.map(initial => (
                    <th
                      key={initial || 'zero'}
                      className="px-2 py-3 text-center font-bold min-w-[54px] text-sm"
                      style={{
                        backgroundColor: headerBg(initial, hoverInitial),
                        color: 'white',
                        transition: 'background-color 150ms ease-out',
                      }}
                    >
                      {initial || '∅'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FINAL_GROUPS.map((group, gi) => (
                  <>
                    {/* section label row */}
                    <tr key={`group-${gi}`}>
                      <td
                        colSpan={INITIALS.length + 1}
                        className="text-[11px] font-bold px-4 py-1.5 uppercase tracking-widest"
                        style={{ backgroundColor: 'rgba(255,107,0,0.1)', color: ORANGE }}
                      >
                        {group.label}
                      </td>
                    </tr>

                    {group.finals.map((final, fi) => (
                      <tr key={final} className={fi % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>

                        {/* final row header */}
                        <td
                          className="sticky left-0 z-10 px-2 py-1.5 text-center font-bold text-xs min-w-[72px]"
                          style={{
                            backgroundColor: headerBg(final, hoverFinal),
                            color: 'white',
                            transition: 'background-color 150ms ease-out',
                          }}
                        >
                          {final}
                        </td>

                        {/* syllable cells */}
                        {INITIALS.map(initial => {
                          const syllable = getSyllable(initial, final)
                          const isMatch  = search.length > 0 && syllable !== null
                            && syllable.toLowerCase().startsWith(search.toLowerCase())
                          const bg = tdBg(final, initial)

                          return (
                            <td
                              key={initial || 'zero'}
                              className="px-0.5 py-0.5 text-center"
                              style={{
                                backgroundColor: bg,
                                transition: 'background-color 150ms ease-out',
                              }}
                            >
                              {syllable ? (
                                <button
                                  onMouseEnter={() => { setHoverFinal(final); setHoverInitial(initial) }}
                                  onMouseLeave={() => { setHoverFinal(null);  setHoverInitial(null) }}
                                  onClick={() => handleCellClick(syllable)}
                                  className={btnClass(final, initial, syllable, isMatch)}
                                  style={btnStyle(final, initial, syllable, isMatch)}
                                >
                                  {syllable}
                                </button>
                              ) : (
                                <span className="block py-2 text-xs" style={{ color: bg ? 'rgba(255,255,255,0.4)' : '#e5e7eb' }}>—</span>
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

          {/* Tone popup */}
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
                <button onClick={() => setPopup(null)} className="text-lingo-muted hover:text-lingo-text text-lg leading-none p-1">✕</button>
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
                      <span>{isPlaying ? '🔊' : '▶️'}</span>
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
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded bg-lingo-surface border border-lingo-border"></span>Valid — click for all tones</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: ORANGE }}></span><span className="text-white" style={{ backgroundColor: ORANGE, padding: '0 2px', borderRadius: 2 }}>Orange</span> row &amp; column</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: TEAL }}></span><span className="text-white" style={{ backgroundColor: TEAL, padding: '0 2px', borderRadius: 2 }}>Teal</span> intersection</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-400"></span>Search match</span>
        </div>

        {/* Tone reference cards */}
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
      </div>

      <WaveDivider variant="white-to-soft-teal" shape="slope" />

      {/* Explainer */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F0FDFA' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: TEAL }}>What is Pinyin?</h2>
          <p className="text-lingo-muted leading-relaxed mb-4">
            Pīyīn (拼音) literally means &ldquo;spell-sounds&rdquo; in Chinese. It&apos;s the standard system for
            transcribing <span style={{ color: ORANGE, fontWeight: 600 }}>Mandarin</span> Chinese sounds using the Latin alphabet.
          </p>
          <p className="text-lingo-muted leading-relaxed">
            Every sound in Mandarin fits into this chart. Master these ~400 combinations plus the four tones,
            and you&apos;ve effectively mastered the pronunciation of every word in the Chinese language.
          </p>
        </div>
      </section>

      <WaveDivider variant="soft-teal-to-white" shape="valley" />
      <WaveDivider variant="white-to-orange" shape="arch" />

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: ORANGE }}>
        <h2 className="text-3xl font-bold text-white mb-4">Practice what you just learned</h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Put your pinyin to work in real-life <strong>Mandarin</strong> missions. 14 days free.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block bg-white font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          style={{ color: ORANGE }}
        >
          Start your free trial →
        </Link>
      </section>

      <WaveDivider variant="orange-to-teal" shape="valley" />
    </div>
  )
}

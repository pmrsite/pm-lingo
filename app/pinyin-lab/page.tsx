'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import WaveDivider from '@/components/ui/WaveDivider'
import Link from 'next/link'
import { playPinyinAudio } from '@/lib/pinyinAudio'

const TEAL      = '#0F766E'
const ORANGE    = '#FF6B00'
const POPUP_W   = 320
const GAP       = 10   // px gap between anchor edge and popup
const MARGIN    = 12   // minimum distance from viewport edge
const MOBILE_BP = 640  // px — below this use bottom-sheet

// Shared class for all axis identifier elements: INITIALS corner, b/p/m…,
// FINALS stripe, a/o/e… — Noto Sans for correct Pinyin glyph rendering.
const AXIS_CLS = 'font-pinyin text-sm font-bold'

const INITIALS = ['', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's']

// Flat ordered list of all finals — no section banners beyond the single FINALS stripe
const ALL_FINALS = [
  'a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er',
  'i', 'ia', 'iao', 'ie', 'iu', 'ian', 'in', 'iang', 'ing', 'iong',
  'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang',
  'ü', 'üe', 'üan', 'ün',
]

// Table geometry — used for both the table element and the wrapper min-width
const FINALS_COL_W    = 88   // px  — left sticky finals label column
const INITIAL_COL_MIN = 48   // px  — minimum width per initial column
const TABLE_MIN_W     = FINALS_COL_W + INITIALS.length * INITIAL_COL_MIN

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
  // j/q/x only combine with i-family and ü-family finals.
  // Plain 'u', 'uan', and 'un' rows must show empty cells for j/q/x:
  //   ju/qu/xu   belong to the ü row  (written without umlaut by convention)
  //   juan/…     belong to the üan row
  //   jun/…      belong to the ün row
  if (['j', 'q', 'x'].includes(initial) && (final === 'u' || final === 'uan' || final === 'un')) {
    return null
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

// Human-friendly tone labels for aria-label attributes
const TONE_LABELS: Record<number, string> = {
  1: 'first tone',
  2: 'second tone',
  3: 'third tone',
  4: 'fourth tone',
  0: 'neutral tone',
}

/** Compute a collision-safe fixed-position coordinate for the popup. */
function calcPos(anchor: DOMRect, popupH: number): { x: number; y: number } {
  const vw = window.innerWidth
  const vh = window.innerHeight
  let x = anchor.right + GAP
  if (x + POPUP_W > vw - MARGIN) x = anchor.left - POPUP_W - GAP
  x = Math.max(MARGIN, Math.min(x, vw - POPUP_W - MARGIN))
  let y = anchor.top
  if (y + popupH > vh - MARGIN) y = vh - popupH - MARGIN
  y = Math.max(MARGIN, y)
  return { x, y }
}

const TONE_INFO = [
  { tone: 1, mark: 'ā', name: '1st Tone', desc: 'High & flat',   symbol: '—',  light: 'bg-blue-50 border-blue-300 text-blue-700' },
  { tone: 2, mark: 'á', name: '2nd Tone', desc: 'Rising',        symbol: '↗',  light: 'bg-green-50 border-green-300 text-green-700' },
  { tone: 3, mark: 'ǎ', name: '3rd Tone', desc: 'Dip & rise',    symbol: '↘↗', light: 'bg-yellow-50 border-yellow-300 text-yellow-700' },
  { tone: 4, mark: 'à', name: '4th Tone', desc: 'Sharp fall',    symbol: '↘',  light: 'bg-red-50 border-red-300 text-red-700' },
  { tone: 0, mark: 'a', name: 'Neutral',  desc: 'Short & light', symbol: '·',  light: 'bg-gray-50 border-gray-300 text-gray-600' },
]

// ── Tone meaning examples ─────────────────────────────────────────────────────
// Shows the most common character + English gloss for each tone of a syllable.
// Only populated for syllables where tones produce clearly distinct, common words.
// Partial entries are fine — missing tones simply show no character.

type ToneMeaning = { simplified: string; english: string }

const TONE_MEANINGS: Record<string, Partial<Record<number, ToneMeaning>>> = {
  a:   { 1: { simplified: '啊', english: 'ah!' },          2: { simplified: '啊', english: 'huh?' },        3: { simplified: '啊', english: 'oh!' },         4: { simplified: '啊', english: 'ah (realization)' } },
  ma:  { 1: { simplified: '妈', english: 'mother' },       2: { simplified: '麻', english: 'hemp / numb' }, 3: { simplified: '马', english: 'horse' },       4: { simplified: '骂', english: 'to scold' },       0: { simplified: '吗', english: 'question particle' } },
  ba:  { 1: { simplified: '巴', english: 'to cling' },     2: { simplified: '拔', english: 'to pull out' }, 3: { simplified: '把', english: 'to hold' },     4: { simplified: '爸', english: 'father' },         0: { simplified: '吧', english: 'suggestion particle' } },
  bo:  { 1: { simplified: '波', english: 'wave' },         2: { simplified: '勃', english: 'vigorous' },    3: { simplified: '跛', english: 'lame' },        4: { simplified: '博', english: 'broad / rich' } },
  pa:  { 1: { simplified: '趴', english: 'to lie face down' }, 2: { simplified: '爬', english: 'to crawl' }, 3: { simplified: '把', english: 'rake' },      4: { simplified: '怕', english: 'to fear' } },
  mi:  { 1: { simplified: '咪', english: 'meow' },         2: { simplified: '迷', english: 'to be lost' }, 3: { simplified: '米', english: 'rice' },        4: { simplified: '密', english: 'secret / dense' } },
  mo:  { 1: { simplified: '摸', english: 'to touch' },     2: { simplified: '模', english: 'model' },      3: { simplified: '抹', english: 'to wipe' },     4: { simplified: '墨', english: 'ink' },            0: { simplified: '么', english: 'particle' } },
  fa:  { 1: { simplified: '发', english: 'to send / hair' }, 2: { simplified: '罚', english: 'to punish' }, 3: { simplified: '法', english: 'law / method' }, 4: { simplified: '发', english: 'to send out' } },
  da:  { 1: { simplified: '搭', english: 'to build' },     2: { simplified: '达', english: 'to reach' },   3: { simplified: '打', english: 'to hit / play' }, 4: { simplified: '大', english: 'big / large' } },
  ta:  { 1: { simplified: '他', english: 'he / him' },     2: { simplified: '它', english: 'it' },         3: { simplified: '塔', english: 'tower' },       4: { simplified: '踏', english: 'to step on' } },
  na:  { 1: { simplified: '拿', english: 'to take' },      2: { simplified: '那', english: 'that' },       3: { simplified: '哪', english: 'which?' },      4: { simplified: '那', english: 'then / that' },    0: { simplified: '呢', english: 'particle' } },
  la:  { 1: { simplified: '拉', english: 'to pull' },      2: { simplified: '辣', english: 'spicy' },      3: { simplified: '啦', english: 'particle' },    4: { simplified: '辣', english: 'hot / spicy' },    0: { simplified: '啦', english: 'particle' } },
  ga:  { 1: { simplified: '噶', english: 'ga (sound)' },   2: { simplified: '轧', english: 'to crush' },   3: { simplified: '嘎', english: 'creak' },       4: { simplified: '噶', english: '(sound)' } },
  ka:  { 1: { simplified: '咖', english: 'coffee' },       2: { simplified: '卡', english: 'card / stuck' }, 3: { simplified: '卡', english: 'card' },      4: { simplified: '卡', english: 'to be stuck' } },
  ha:  { 1: { simplified: '哈', english: 'ha! (laugh)' },  2: { simplified: '蛤', english: 'clam' },       3: { simplified: '哈', english: 'ha!' },         4: { simplified: '哈', english: 'exhale' } },
  ge:  { 1: { simplified: '哥', english: 'older brother' }, 2: { simplified: '格', english: 'grid / rule' }, 3: { simplified: '个', english: '(measure word)' }, 4: { simplified: '各', english: 'each / every' }, 0: { simplified: '的', english: 'particle' } },
  ke:  { 1: { simplified: '科', english: 'science / dept' }, 2: { simplified: '可', english: 'can / may' }, 3: { simplified: '可', english: 'but / however' }, 4: { simplified: '课', english: 'lesson / class' } },
  he:  { 1: { simplified: '喝', english: 'to drink' },     2: { simplified: '河', english: 'river' },      3: { simplified: '和', english: 'and / with' },  4: { simplified: '喝', english: 'drink!' },         0: { simplified: '和', english: 'and' } },
  shi: { 1: { simplified: '诗', english: 'poem / poetry' }, 2: { simplified: '时', english: 'time / when' }, 3: { simplified: '使', english: 'to make' },   4: { simplified: '是', english: 'is / am / are' } },
  zhi: { 1: { simplified: '知', english: 'to know' },      2: { simplified: '直', english: 'straight' },   3: { simplified: '纸', english: 'paper' },       4: { simplified: '志', english: 'ambition / will' } },
  chi: { 1: { simplified: '吃', english: 'to eat' },       2: { simplified: '迟', english: 'late / slow' }, 3: { simplified: '尺', english: 'ruler / unit' }, 4: { simplified: '赤', english: 'red / bare' } },
  ri:  { 1: { simplified: '日', english: 'sun / day' },    2: { simplified: '日', english: 'day' } },
  zi:  { 1: { simplified: '资', english: 'resources' },    2: { simplified: '字', english: 'character / word' }, 3: { simplified: '紫', english: 'purple' }, 4: { simplified: '自', english: 'self / from' },   0: { simplified: '子', english: 'child / son' } },
  ci:  { 1: { simplified: '词', english: 'word / lyrics' }, 2: { simplified: '瓷', english: 'porcelain' }, 3: { simplified: '此', english: 'this / here' }, 4: { simplified: '次', english: 'next / time' } },
  si:  { 1: { simplified: '丝', english: 'silk / thread' }, 2: { simplified: '思', english: 'to think' },  3: { simplified: '死', english: 'to die / dead' }, 4: { simplified: '四', english: 'four' } },
  yi:  { 1: { simplified: '一', english: 'one' },          2: { simplified: '宜', english: 'suitable' },   3: { simplified: '以', english: 'with / by' },   4: { simplified: '意', english: 'meaning / idea' } },
  wu:  { 1: { simplified: '五', english: 'five' },         2: { simplified: '无', english: 'without / none' }, 3: { simplified: '武', english: 'martial' },  4: { simplified: '物', english: 'thing / object' } },
  yu:  { 1: { simplified: '鱼', english: 'fish' },         2: { simplified: '于', english: 'at / in' },    3: { simplified: '雨', english: 'rain' },        4: { simplified: '玉', english: 'jade' } },
  li:  { 1: { simplified: '梨', english: 'pear' },         2: { simplified: '离', english: 'to leave' },   3: { simplified: '里', english: 'inside / li (unit)' }, 4: { simplified: '力', english: 'strength / power' } },
  ni:  { 2: { simplified: '你', english: 'you (informal)' }, 3: { simplified: '你', english: 'you' },      4: { simplified: '腻', english: 'greasy / bored' } },
  wo:  { 3: { simplified: '我', english: 'I / me' } },
  de:  { 0: { simplified: '的', english: 'possessive particle' } },
  men: { 0: { simplified: '们', english: 'plural suffix' } },
  zai: { 4: { simplified: '再', english: 'again' },        1: { simplified: '灾', english: 'disaster' } },
  qu:  { 1: { simplified: '区', english: 'area / district' }, 2: { simplified: '曲', english: 'song / curved' }, 3: { simplified: '取', english: 'to take' }, 4: { simplified: '去', english: 'to go' } },
  lai: { 2: { simplified: '来', english: 'to come' } },
  hao: { 1: { simplified: '蒿', english: 'wormwood' },     2: { simplified: '豪', english: 'hero / grand' }, 3: { simplified: '好', english: 'good / well' }, 4: { simplified: '好', english: 'to love / fond of' } },
  dui: { 4: { simplified: '对', english: 'correct / towards' } },
  bu:  { 2: { simplified: '不', english: 'not / no' },     4: { simplified: '不', english: 'not / no' },   3: { simplified: '补', english: 'to mend / supplement' }, 1: { simplified: '布', english: 'cloth / to spread' } },
}

// ── SVG play / pause icons ────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <polygon points="3,1 13,7 3,13" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1" width="4" height="12" rx="1" />
      <rect x="8" y="1" width="4" height="12" rx="1" />
    </svg>
  )
}

// ── Tone panel shared between desktop popover and mobile bottom sheet ────────
function TonePanel({
  syllable, playingTone, onTone, onClose,
}: {
  syllable: string
  playingTone: number | null
  onTone: (tone: number) => void
  onClose: () => void
}) {
  return (
    <>
      <div className="flex items-start justify-between mb-3">
        <div>
          {/* Syllable header: Noto Sans for correct tone-mark rendering */}
          <div className="font-pinyin text-3xl font-bold" style={{ color: TEAL }}>{syllable}</div>
          <div className="text-xs text-gray-400 mt-0.5">Tap a tone to hear it</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close tone panel"
          className="text-gray-400 hover:text-gray-700 text-lg leading-none p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="space-y-1.5">
        {TONE_INFO.map(({ tone, name, desc, symbol, light }) => {
          const withTone  = addTone(syllable, tone)
          const isPlaying = playingTone === tone
          const meaning   = TONE_MEANINGS[syllable]?.[tone]
          return (
            <button
              key={tone}
              onClick={() => onTone(tone)}
              aria-label={`Play ${withTone} — ${TONE_LABELS[tone]}${meaning ? `, ${meaning.english}` : ''}`}
              aria-pressed={isPlaying}
              className={[
                'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 transition-all',
                isPlaying
                  ? light + ' shadow-sm'
                  : 'border-gray-200 bg-gray-50 hover:border-[#0F766E]/40 hover:bg-[#F0FDFA]',
              ].join(' ')}
            >
              {/* Contour symbol */}
              <span className="text-base w-6 text-center shrink-0" aria-hidden="true">{symbol}</span>

              {/* Tone-marked pinyin */}
              <span className="font-pinyin text-xl font-bold w-10 text-left shrink-0" style={{ color: isPlaying ? undefined : TEAL }}>
                {withTone}
              </span>

              {/* Character + meaning — shown when data exists for this syllable/tone */}
              {meaning ? (
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="font-chinese text-xl font-bold text-lingo-text shrink-0">{meaning.simplified}</span>
                  <span className="text-xs text-gray-500 truncate">{meaning.english}</span>
                </div>
              ) : (
                <div className="flex-1" />
              )}

              {/* Tone name + description */}
              <div className="text-right shrink-0">
                <div className="text-xs font-semibold text-gray-700">{name}</div>
                <div className="text-[10px] text-gray-400">{desc}</div>
              </div>

              {/* Play / pause icon */}
              <span className="shrink-0 text-gray-500">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </span>
            </button>
          )
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 text-[10px] text-gray-400 text-center">
        Human audio · TTS fallback (zh-CN)
      </div>
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PinyinLabPage() {
  const [selectedTone, setSelectedTone] = useState(1)
  const [activeSyl,    setActiveSyl]    = useState<string | null>(null)
  const [playingTone,  setPlayingTone]  = useState<number | null>(null)
  const [search,       setSearch]       = useState('')

  const [popoverPos,  setPopoverPos]  = useState<{ x: number; y: number } | null>(null)
  const anchorRef  = useRef<HTMLButtonElement | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const popoverH   = useRef(360)

  const [isMobile,  setIsMobile]  = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < MOBILE_BP) }
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const closeAll = useCallback(() => {
    // Return focus to the cell that opened the dialog before clearing the ref
    const trigger = anchorRef.current
    setActiveSyl(null)
    setPopoverPos(null)
    setSheetOpen(false)
    anchorRef.current = null
    requestAnimationFrame(() => trigger?.focus())
  }, [])

  const reposition = useCallback(() => {
    if (!anchorRef.current || isMobile) return
    const rect = anchorRef.current.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight
      || rect.right < 0 || rect.left > window.innerWidth) {
      closeAll(); return
    }
    setPopoverPos(calcPos(rect, popoverH.current))
  }, [isMobile, closeAll])

  useEffect(() => {
    if (!anchorRef.current) return
    window.addEventListener('resize', reposition, { passive: true })
    return () => window.removeEventListener('resize', reposition)
  }, [reposition])

  useEffect(() => {
    if (!activeSyl) return
    function onScroll() { closeAll() }
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    return () => window.removeEventListener('scroll', onScroll, { capture: true })
  }, [activeSyl, closeAll])

  useEffect(() => {
    if (!popoverPos) return
    function onPointerDown(e: PointerEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)
        && !(e.target as Element).closest('[data-pinyin-cell]')) {
        closeAll()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [popoverPos, closeAll])

  useEffect(() => {
    if (!activeSyl) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeAll() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [activeSyl, closeAll])

  // Measure rendered popup height and correct position
  useEffect(() => {
    if (popoverRef.current) {
      const h = popoverRef.current.offsetHeight
      if (h && h !== popoverH.current) { popoverH.current = h; reposition() }
    }
  })

  // Move focus into dialog when it opens so keyboard/screen-reader users can interact
  useEffect(() => {
    if (popoverRef.current && (popoverPos || sheetOpen)) {
      popoverRef.current.focus()
    }
  }, [popoverPos, sheetOpen])

  const handleCellClick = useCallback((syllable: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    anchorRef.current = btn
    if (isMobile) {
      setActiveSyl(syllable); setSheetOpen(true)
      setPlayingTone(selectedTone)
      playPinyinAudio(syllable, selectedTone, addTone(syllable, selectedTone))
      return
    }
    const rect = btn.getBoundingClientRect()
    setActiveSyl(syllable)
    setPopoverPos(calcPos(rect, popoverH.current))
    setPlayingTone(selectedTone)
    playPinyinAudio(syllable, selectedTone, addTone(syllable, selectedTone))
  }, [isMobile, selectedTone])

  function handleTone(syllable: string, tone: number) {
    playPinyinAudio(syllable, tone, addTone(syllable, tone))
    setPlayingTone(tone)
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
          Click any valid cell to see all 4 tones and hear the pronunciation.
        </p>
      </section>

      <WaveDivider variant="teal-to-white" shape="arch" />

      <div className="max-w-[1400px] mx-auto px-4 py-8">

        {/* Search + default tone selector */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-lingo-surface rounded-xl border border-lingo-border">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <svg className="w-4 h-4 text-lingo-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              aria-label="Search pinyin syllables"
              placeholder="Search pinyin (e.g. ma, zhi, juan)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-lingo-text placeholder-lingo-muted focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="text-lingo-muted hover:text-lingo-text text-xs"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lingo-muted font-medium" id="tone-selector-label">Default tone:</span>
            {TONE_INFO.map(({ tone, mark, name }) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                aria-label={name}
                aria-pressed={selectedTone === tone}
                className={`font-pinyin w-9 h-9 rounded-full text-sm font-bold transition-all ${
                  selectedTone === tone
                    ? 'text-white shadow-md scale-110'
                    : 'bg-white border border-lingo-border text-lingo-muted hover:border-lingo-teal hover:text-lingo-teal'
                }`}
                style={selectedTone === tone ? { backgroundColor: TEAL } : undefined}
              >
                {mark}
              </button>
            ))}
          </div>
        </div>

        {/* Pinyin matrix
            - overflow-x: auto on wrapper allows horizontal scrolling on narrow viewports
            - table: width 100% fills container; table-layout fixed gives equal-width initial columns
            - minWidth on table prevents cells becoming unreadably narrow before scroll kicks in
        */}
        <div className="overflow-x-auto rounded-xl border border-lingo-border shadow-sm">
          <table
            aria-label="Mandarin Pinyin Chart"
            className="border-collapse"
            style={{
              width: '100%',
              minWidth: `${TABLE_MIN_W}px`,
              tableLayout: 'fixed',
            }}
          >
            <thead>
              <tr>
                {/* Corner: INITIALS label — explicit width drives the fixed-layout finals column */}
                <th
                  scope="col"
                  className={`${AXIS_CLS} px-3 py-3 text-center sticky left-0 z-20 tracking-widest`}
                  style={{ backgroundColor: TEAL, color: '#ffffff', width: `${FINALS_COL_W}px` }}
                >
                  INITIALS
                </th>
                {/* Initial consonant headers — all share remaining width equally in fixed layout */}
                {INITIALS.map(initial => (
                  <th
                    key={initial || 'zero'}
                    scope="col"
                    aria-label={initial === '' ? 'Standalone syllables' : initial}
                    className={`${AXIS_CLS} px-2 py-3 text-center`}
                    style={{ backgroundColor: TEAL, color: '#ffffff' }}
                  >
                    {initial}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* FINALS stripe — single full-width orange banner below the Initials header */}
              <tr>
                <td
                  colSpan={INITIALS.length + 1}
                  className={`${AXIS_CLS} px-4 py-2 text-center tracking-widest`}
                  style={{ backgroundColor: ORANGE, color: '#ffffff' }}
                  aria-hidden="true"
                >
                  FINALS
                </td>
              </tr>

              {/* Finals rows — continuous, no i/u/ü section banners */}
              {ALL_FINALS.map((final, fi) => (
                <tr key={final} className={fi % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>

                  {/* Finals label — semantic row header; Noto Sans via AXIS_CLS */}
                  <th
                    scope="row"
                    className={`${AXIS_CLS} sticky left-0 z-10 px-2 py-1.5 text-center`}
                    style={{ backgroundColor: ORANGE, color: '#ffffff' }}
                  >
                    {final}
                  </th>

                  {/* Syllable cells — font-pinyin ensures correct Noto Sans rendering */}
                  {INITIALS.map(initial => {
                    const syllable = getSyllable(initial, final)
                    const isActive = activeSyl === syllable && syllable !== null
                    const isMatch  = !isActive && search.length > 0 && syllable !== null
                      && syllable.toLowerCase().startsWith(search.toLowerCase())

                    return (
                      <td key={initial || 'zero'} className="px-0.5 py-0.5 text-center">
                        {syllable ? (
                          <button
                            data-pinyin-cell
                            onClick={e => handleCellClick(syllable, e)}
                            aria-label={`${syllable}, click to hear tones`}
                            aria-pressed={isActive}
                            className={
                              'font-pinyin w-full px-1 py-2 rounded-lg text-xs font-semibold '
                              + 'transition-colors duration-150 ease-out '
                              + 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/40 '
                              + (isActive
                                ? ''
                                : isMatch
                                ? 'bg-yellow-100 text-yellow-900 ring-2 ring-yellow-400 '
                                : 'bg-lingo-surface text-lingo-text hover:bg-[#F0FDFA] ')
                            }
                            style={isActive
                              ? { backgroundColor: TEAL, color: '#ffffff', fontWeight: 600,
                                  boxShadow: '0 0 0 2px rgba(15,118,110,0.25)' }
                              : undefined
                            }
                          >
                            {syllable}
                          </button>
                        ) : (
                          <span className="block py-2 text-xs text-gray-200" aria-hidden="true">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-6 text-xs text-lingo-muted" role="list" aria-label="Chart legend">
          <span className="flex items-center gap-1.5" role="listitem">
            <span className="inline-block w-4 h-4 rounded bg-lingo-surface border border-lingo-border" aria-hidden="true" />
            Valid — click for all tones
          </span>
          <span className="flex items-center gap-1.5" role="listitem">
            <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: TEAL }} aria-hidden="true" />
            Selected
          </span>
          <span className="flex items-center gap-1.5" role="listitem">
            <span className="inline-block w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-400" aria-hidden="true" />
            Search match
          </span>
        </div>

        {/* Tone reference cards */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {TONE_INFO.map(({ tone, mark, name, desc, light }) => (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              aria-pressed={selectedTone === tone}
              aria-label={`${name}: ${desc}`}
              className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                selectedTone === tone ? light + ' shadow-md scale-105' : 'bg-white border-lingo-border'
              }`}
            >
              {/* Tone-marked vowel: Noto Sans for correct diacritic rendering */}
              <div className="font-pinyin text-2xl font-bold mb-1 text-lingo-text" aria-hidden="true">{mark}</div>
              {/* Name + description: Inter — English UI labels */}
              <div className="text-sm font-semibold text-lingo-text">{name}</div>
              <div className="text-xs mt-0.5 text-lingo-muted">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop / tablet anchored popover */}
      {!isMobile && popoverPos && activeSyl && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={`Tones for ${activeSyl}`}
          aria-modal="false"
          tabIndex={-1}
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 focus:outline-none"
          style={{
            position: 'fixed',
            top: popoverPos.y,
            left: popoverPos.x,
            width: POPUP_W,
            maxWidth: `calc(100vw - ${MARGIN * 2}px)`,
            zIndex: 9999,
          }}
        >
          <TonePanel
            syllable={activeSyl}
            playingTone={playingTone}
            onTone={tone => handleTone(activeSyl, tone)}
            onClose={closeAll}
          />
        </div>
      )}

      {/* Mobile bottom sheet */}
      {isMobile && sheetOpen && activeSyl && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[9998]" aria-hidden="true" onClick={closeAll} />
          <div
            ref={popoverRef}
            role="dialog"
            aria-label={`Tones for ${activeSyl}`}
            aria-modal="true"
            tabIndex={-1}
            className="fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-t-2xl shadow-2xl px-4 pt-4 pb-8 focus:outline-none"
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" aria-hidden="true" />
            <TonePanel
              syllable={activeSyl}
              playingTone={playingTone}
              onTone={tone => handleTone(activeSyl, tone)}
              onClose={closeAll}
            />
          </div>
        </>
      )}

      <WaveDivider variant="white-to-soft-teal" shape="slope" />

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

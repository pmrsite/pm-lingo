/**
 * Pinyin audio resolver and managed playback.
 *
 * Directory layout:
 *   public/audio/pinyin/{syllable}/{syllable}{tone}.mp3
 *
 * Tone numbers:  1 = first, 2 = second, 3 = third, 4 = fourth, 0 = neutral
 *
 * Filenames use ASCII digits — never tone-marked Unicode characters.
 * The learner-facing UI continues to display proper Pinyin tone marks.
 *
 * Playback priority:
 *   1. Human recording at the resolved path
 *   2. zh-CN browser TTS when the recording is missing or fails to load
 *
 * A single Audio element is managed globally so that clicking a new tone
 * while one is playing stops the previous recording before starting the next.
 */

// ── Path resolver ─────────────────────────────────────────────────────────────

export function getPinyinAudioPath(syllable: string, tone: number): string {
  return `/audio/pinyin/${syllable}/${syllable}${tone}.mp3`
}

// ── Managed singleton player ──────────────────────────────────────────────────

let _current: HTMLAudioElement | null = null

function _stopCurrent(): void {
  if (_current) {
    _current.pause()
    _current.src = ''   // release the network connection
    _current = null
  }
}

function _ttsFallback(toneMarkedText: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(toneMarkedText)
  utter.lang  = 'zh-CN'
  utter.rate  = 0.7
  window.speechSynthesis.speak(utter)
}

/**
 * Play the human recording for (syllable, tone).
 * Falls back to zh-CN TTS if the file is missing or fails to load.
 *
 * @param syllable       Plain ASCII syllable, e.g. "ma", "zhi"
 * @param tone           1 | 2 | 3 | 4 | 0
 * @param toneMarkedText Tone-marked form for TTS fallback, e.g. "mā", "zhī"
 */
export function playPinyinAudio(
  syllable: string,
  tone: number,
  toneMarkedText: string,
): void {
  if (typeof window === 'undefined') return

  // Stop whatever was playing (human audio or TTS)
  _stopCurrent()
  window.speechSynthesis.cancel()

  const path  = getPinyinAudioPath(syllable, tone)
  const audio = new Audio(path)
  _current    = audio

  // 'error' fires when the resource cannot be decoded or the request fails (e.g. 404)
  audio.addEventListener(
    'error',
    () => {
      if (_current === audio) _current = null
      _ttsFallback(toneMarkedText)
    },
    { once: true },
  )

  audio.play().catch(() => {
    // play() may reject before 'error' fires (autoplay policy, immediate abort, etc.)
    if (_current === audio) _current = null
    _ttsFallback(toneMarkedText)
  })
}

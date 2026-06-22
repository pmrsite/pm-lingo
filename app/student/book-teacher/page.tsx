'use client'
import { useState } from 'react'
import { aiTeachers } from '@/data/aiTeachers'

export default function BookTeacherPage() {
  const [teacher, setTeacher] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState<30 | 60 | 90>(60)
  const [booked, setBooked] = useState(false)

  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00']

  function handleBook() {
    if (teacher && date && time) setBooked(true)
  }

  if (booked) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-lingo-navy mb-2">Session Booked!</h1>
        <p className="text-gray-500 mb-6">Your {duration}-minute session with {aiTeachers.find(t => t.id === teacher)?.name} is confirmed.</p>
        <div className="bg-lingo-surface rounded-2xl p-6 text-left mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Teacher</span><span className="font-medium">{aiTeachers.find(t => t.id === teacher)?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{date}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{time}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium">{duration} minutes</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Zoom Link</span><span className="font-medium text-lingo-red">Available 15 min before session</span></div>
          </div>
        </div>
        <button onClick={() => setBooked(false)} className="text-sm text-lingo-red hover:underline">Book another session</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-2">Book a teacher session</h1>
      <p className="text-gray-500 mb-10">Choose your teacher, pick a time, and confirm your booking.</p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select teacher</label>
          <div className="grid grid-cols-2 gap-3">
            {aiTeachers.map((t) => (
              <button
                key={t.id}
                onClick={() => setTeacher(t.id)}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${teacher === t.id ? 'border-lingo-red bg-lingo-red/5' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <div className="font-semibold text-sm text-lingo-navy">{t.name}</div>
                <div className="text-xs text-lingo-red mt-0.5">{t.speciality}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-lingo-red transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select time</label>
          <div className="grid grid-cols-5 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setTime(slot)}
                className={`py-2 rounded-xl text-sm font-medium border-2 transition-all ${time === slot ? 'border-lingo-red bg-lingo-red text-white' : 'border-gray-100 hover:border-gray-300'}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Duration</label>
          <div className="flex gap-3">
            {([30, 60, 90] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${duration === d ? 'border-lingo-red bg-lingo-red text-white' : 'border-gray-100 hover:border-gray-300'}`}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleBook}
          disabled={!teacher || !date || !time}
          className="w-full bg-lingo-red hover:bg-lingo-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

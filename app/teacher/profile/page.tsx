export const metadata = { title: 'Profile — PM-Lingo Teacher' }

export default function TeacherProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-10">Edit Profile</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-lingo-navy to-lingo-red rounded-2xl flex items-center justify-center text-white text-3xl font-bold">L</div>
          <div>
            <button className="text-sm bg-lingo-surface hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg transition-colors">Change photo</button>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF · Max 2MB</p>
          </div>
        </div>
        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
              <input defaultValue="Lin" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
              <input defaultValue="Wei" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input defaultValue="lin.wei@pm-lingo.com" type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea rows={4} defaultValue="Certified Mandarin teacher with 8 years of experience teaching practical Chinese to international learners." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Speciality</label>
            <input defaultValue="Conversational Fluency" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lingo-red/20 focus:border-lingo-red" />
          </div>
          <button type="submit" className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

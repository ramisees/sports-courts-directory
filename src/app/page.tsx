export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Sports Courts Near You
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover basketball, tennis, pickleball, volleyball, and more courts in your area. 
            Get details on hours, fees, and amenities.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg inline-block">
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                placeholder="Enter your location..." 
                className="px-4 py-2 text-gray-800 rounded border flex-1 min-w-64"
              />
              <select className="px-4 py-2 text-gray-800 rounded border">
                <option>All Sports</option>
                <option>Basketball</option>
                <option>Tennis</option>
                <option>Pickleball</option>
                <option>Volleyball</option>
                <option>Racquetball</option>
              </select>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Search Courts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Coming Soon</h2>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re working hard to bring you the most comprehensive sports courts directory!
          </p>
          <div className="text-sm text-gray-500">
            <p>🏀 Basketball Courts • 🎾 Tennis Courts • 🏓 Pickleball Courts</p>
            <p>🏐 Volleyball Courts • 🥎 Racquetball Courts • And More!</p>
          </div>
        </div>
      </section>
    </div>
  )
}

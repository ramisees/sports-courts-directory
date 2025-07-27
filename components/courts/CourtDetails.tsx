import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Users, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import type { Court } from '../../types/courts';

interface TimeSlot {
  time: string;
  available: boolean;
}

const generateTimeSlots = () => {
  const slots: TimeSlot[] = [];
  for (let hour = 6; hour < 23; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available: Math.random() > 0.3
    });
  }
  return slots;
};

export default function CourtDetails({ court }: { court: Court }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [players, setPlayers] = useState(2);
  const [expandedSection, setExpandedSection] = useState('description');
  
  const timeSlots = generateTimeSlots();

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      {/* Image Gallery */}
      <div className="relative h-96 group">
        <Image
          src={court.images[0]}
          alt={court.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-black">
                  {court.type}
                </span>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Open Now</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">{court.name}</h1>
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{court.location.address}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800 mb-6">
              {['Description', 'Amenities', 'Rules & Policies', 'Photos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setExpandedSection(tab.toLowerCase())}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    expandedSection === tab.toLowerCase()
                      ? 'border-yellow-500 text-yellow-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {/* Description */}
              <div className={expandedSection === 'description' ? 'block' : 'hidden'}>
                <p className="text-gray-300 leading-relaxed">
                  {court.description}
                </p>
              </div>

              {/* Amenities */}
              <div className={expandedSection === 'amenities' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-2 gap-4">
                  {court.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-300">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        {/* Icon placeholder */}
                        <span className="text-yellow-500">✓</span>
                      </div>
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold">${court.pricePerHour}</span>
                <span className="text-gray-400">/hour</span>
              </div>

              {/* Booking Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.slice(0, 6).map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedTime === slot.time
                            ? 'bg-yellow-500 text-black'
                            : slot.available
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  >
                    {[1, 2, 3, 4].map((hours) => (
                      <option key={hours} value={hours}>
                        {hours} {hours === 1 ? 'hour' : 'hours'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Players
                  </label>
                  <select
                    value={players}
                    onChange={(e) => setPlayers(parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  >
                    {[2, 4, 6, 8, 10].map((count) => (
                      <option key={count} value={count}>
                        {count} players
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Court Fee</span>
                    <span className="text-white">${court.pricePerHour * duration}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-400">Service Fee</span>
                    <span className="text-white">$5.00</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${court.pricePerHour * duration + 5}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

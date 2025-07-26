import { NextApiResponse } from 'next';
import withAuth, { AuthenticatedRequest } from '../../../middleware/withAuth';
import type { Court } from '../../../types/courts';

interface BookingRequest {
  courtId: string;
  date: string;
  startTime: string;
  duration: number; // in hours
}

interface Booking extends BookingRequest {
  id: string;
  userId: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

// Simulated database
const bookings: Booking[] = [];

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // Create a new booking
      try {
        const { courtId, date, startTime, duration }: BookingRequest = req.body;

        // Validate request
        if (!courtId || !date || !startTime || !duration) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if court exists and is available
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courts/${courtId}`);
        if (!response.ok) {
          return res.status(404).json({ message: 'Court not found' });
        }
        
        const court: Court = await response.json();
        
        // Check if court is already booked for the requested time
        const conflictingBooking = bookings.find(booking => 
          booking.courtId === courtId &&
          booking.date === date &&
          booking.status !== 'cancelled' &&
          (
            (booking.startTime <= startTime && 
             addHours(booking.startTime, booking.duration) > startTime) ||
            (startTime <= booking.startTime && 
             addHours(startTime, duration) > booking.startTime)
          )
        );

        if (conflictingBooking) {
          return res.status(409).json({ message: 'Court is already booked for this time' });
        }

        // Create new booking
        const booking: Booking = {
          id: Math.random().toString(36).substr(2, 9),
          userId: req.user!.id,
          courtId,
          date,
          startTime,
          duration,
          status: 'pending',
          createdAt: new Date().toISOString(),
          totalPrice: court.pricePerHour * duration
        };

        bookings.push(booking);

        return res.status(201).json(booking);
      } catch (error) {
        console.error('Booking creation error:', error);
        return res.status(500).json({ message: 'Error creating booking' });
      }

    case 'GET':
      // Get user's bookings
      try {
        const userBookings = bookings.filter(booking => 
          booking.userId === req.user!.id
        );
        return res.status(200).json(userBookings);
      } catch (error) {
        console.error('Booking retrieval error:', error);
        return res.status(500).json({ message: 'Error retrieving bookings' });
      }

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Helper function to add hours to a time string
function addHours(time: string, hours: number): string {
  const [h, m] = time.split(':').map(Number);
  const newHours = (h + hours) % 24;
  return `${newHours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export default withAuth(handler);

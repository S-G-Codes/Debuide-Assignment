// API 
import { NextResponse } from 'next/server';
import { ReservationService } from '../../lib/Services/ResversationService';
import { RoomType } from '../../lib/Models/Room';

const reservationService = new ReservationService();

export async function POST(request) {
  const body = await request.json();
  const { roomType } = body;

  if (!Object.values(RoomType).includes(roomType)) {
    return NextResponse.json({ error: 'Invalid room type' }, { status: 400 });
  }

  const reservation = reservationService.makeReservation(roomType);

  if (reservation) {
    const availability = reservationService.getRemainingAvailability();
    return NextResponse.json({ reservation, availability }, { status: 200 });
  } else {
    return NextResponse.json({ 
      error: 'Sorry, no rooms could be reserved.', 
      availability: reservationService.getRemainingAvailability() 
    }, { status: 400 });
  }
}
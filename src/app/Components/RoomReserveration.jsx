'use client'
import React, { useState } from 'react';
import { RoomType } from '../lib/Models/Room'

const RoomReservation = () => {
  const [roomType, setRoomType] = useState(RoomType.NORMAL);
  const [result, setResult] = useState('');


const handleReservation = async () => {
  try {
    const response = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomType })
    });

    const data = await response.json();

    if (response.ok) {
      setResult(`Reserved: ${data.reservation.roomType} (Patient ID: ${data.reservation.patientId})\n\nRemaining availability:\n${formatAvailability(data.availability)}`);
    } else {
      setResult(`Reservation failed: ${data.error}\n\nRemaining availability:\n${formatAvailability(data.availability)}`);
    }
  } catch (error) {
    setResult('An error occurred while making the reservation.');
  }
};

  const formatAvailability = (availability) => {
    return availability.map(room => `${room.type}: ${room.quantity}`).join('\n');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-blue shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Hospital Room Reservation</h1>
      <select 
        value={roomType} 
        onChange={(e) => setRoomType(e.target.value)} 
        className="border border-gray-300 p-2 rounded bg-white text-black"
      >
        {Object.values(RoomType).map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <button 
        onClick={handleReservation} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Reserve Room
      </button>
      <pre className="mt-4">{result}</pre>
    </div>
  );
};
export default RoomReservation;
import { POST } from '../route';
import { NextRequest } from 'next/server';

import { ReservationService } from '../../../lib/Services/ResversationService';

jest.mock('../../../lib/Services/ResversationService');

describe('POST /api/reserve', () => {
  let mockReservationService;

  beforeEach(() => {
    mockReservationService = {
      makeReservation: jest.fn(),
      getRemainingAvailability: jest.fn(),
    };
    ReservationService.mockImplementation(() => mockReservationService);
  });

  test('should return 400 for invalid room type', async () => {
    const request = new NextRequest('http://localhost:3000/api/reserve', {
      method: 'POST',
      body: JSON.stringify({ roomType: 'Invalid Room' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toBe('Invalid room type');
  });

  test('should return 200 and reservation details for successful reservation', async () => {
    const mockReservation = { roomType: 'Normal Room', patientId: '123' };
    const mockAvailability = [{ type: 'Normal Room', quantity: 49 }];

    mockReservationService.makeReservation.mockReturnValue(mockReservation);
    mockReservationService.getRemainingAvailability.mockReturnValue(mockAvailability);

    const request = new NextRequest('http://localhost:3000/api/reserve', {
      method: 'POST',
      body: JSON.stringify({ roomType: 'Normal Room' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.reservation).toEqual(mockReservation);
    expect(data.availability).toEqual(mockAvailability);
  });
});
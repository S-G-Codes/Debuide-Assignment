import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoomReservation from '../RoomReserveration';


global.fetch = jest.fn();

describe('RoomReservation', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders RoomReservation component', () => {
    render(<RoomReservation />);
    expect(screen.getByText('Hospital Room Reservation')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reserve Room' })).toBeInTheDocument();
  });

  test('makes a reservation successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        reservation: { roomType: 'Normal Room', patientId: '123' },
        availability: [{ type: 'Normal Room', quantity: 49 }]
      })
    });

    render(<RoomReservation />);

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Normal Room');
    fireEvent.click(screen.getByRole('button', { name: 'Reserve Room' }));

    await waitFor(() => {
      expect(screen.getByText(/Reserved: Normal Room/)).toBeInTheDocument();
      expect(screen.getByText(/Patient ID: 123/)).toBeInTheDocument();
      expect(screen.getByText(/Normal Room: 49/)).toBeInTheDocument();
    });
  });

  test('handles reservation failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'Reservation not possible',
        availability: [{ type: 'Normal Room', quantity: 0 }]
      })
    });

    render(<RoomReservation />);

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Normal Room');
    fireEvent.click(screen.getByRole('button', { name: 'Reserve Room' }));

    await waitFor(() => {
      expect(screen.getByText(/Reservation failed: Reservation not possible/)).toBeInTheDocument();
      expect(screen.getByText(/Normal Room: 0/)).toBeInTheDocument();
    });
  });
});
import { ReservationService } from '../ResversationService';
import { RoomType } from '../../Models/Room';
import { EquipmentType } from '../../Models/Equiment'


jest.mock('../../Repositores/RoomRepositories');
jest.mock('../../Repositores/EquipmentRepository');

describe('ReservationService', () => {
  let reservationService;
  let mockRoomRepo;
  let mockEquipmentRepo;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRoomRepo = {
      reserveRoom: jest.fn().mockReturnValue(true),
      releaseRoom: jest.fn()
    };
    mockEquipmentRepo = {
      getAvailability: jest.fn().mockReturnValue([
        { type: EquipmentType.FLAT_BED, quantity: 10 },
        { type: EquipmentType.NORMAL_MASK, quantity: 20 }
      ]),
      reserveEquipment: jest.fn().mockReturnValue(true)
    };
    
    reservationService = new ReservationService();
    reservationService.roomRepo = mockRoomRepo;
    reservationService.equipmentRepo = mockEquipmentRepo;
    reservationService.generatePatientId = jest.fn().mockReturnValue('123');
  });

  test('makeReservation should return a reservation when resources are available', () => {
    const reservation = reservationService.makeReservation(RoomType.NORMAL);

    expect(reservation).not.toBeNull();
    expect(reservation.roomType).toBe(RoomType.NORMAL);
    expect(reservation.patientId).toBe('123');
    expect(mockRoomRepo.reserveRoom).toHaveBeenCalledWith(RoomType.NORMAL);
    expect(mockEquipmentRepo.reserveEquipment).toHaveBeenCalledTimes(2); // For flat bed and normal mask
  });

  test('makeReservation should return null when room is not available', () => {
    mockRoomRepo.reserveRoom.mockReturnValue(false);

    const reservation = reservationService.makeReservation(RoomType.NORMAL);

    expect(reservation).toBeNull();
    expect(mockRoomRepo.reserveRoom).toHaveBeenCalledWith(RoomType.NORMAL);
    expect(mockEquipmentRepo.reserveEquipment).not.toHaveBeenCalled();
  });

  test('makeReservation should return null and release room when equipment is not available', () => {
    mockEquipmentRepo.getAvailability.mockReturnValue([
      { type: EquipmentType.FLAT_BED, quantity: 0 },
      { type: EquipmentType.NORMAL_MASK, quantity: 20 }
    ]);

    const reservation = reservationService.makeReservation(RoomType.NORMAL);

    expect(reservation).toBeNull();
    expect(mockRoomRepo.reserveRoom).toHaveBeenCalledWith(RoomType.NORMAL);
    expect(mockRoomRepo.releaseRoom).toHaveBeenCalledWith(RoomType.NORMAL);
    expect(mockEquipmentRepo.reserveEquipment).not.toHaveBeenCalled();
  });

  test('reserveEquipmentForRoom should return true when all equipment is available', () => {
    const result = reservationService.reserveEquipmentForRoom(RoomType.NORMAL);

    expect(result).toBe(true);
    expect(mockEquipmentRepo.reserveEquipment).toHaveBeenCalledTimes(2);
  });

  test('reserveEquipmentForRoom should return false when some equipment is not available', () => {
    mockEquipmentRepo.getAvailability.mockReturnValue([
      { type: EquipmentType.FLAT_BED, quantity: 0 },
      { type: EquipmentType.NORMAL_MASK, quantity: 20 }
    ]);

    const result = reservationService.reserveEquipmentForRoom(RoomType.NORMAL);

    expect(result).toBe(false);
    expect(mockEquipmentRepo.reserveEquipment).not.toHaveBeenCalled();
  });
});
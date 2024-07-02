import { RoomRepository } from '../RoomRepositories';
import { RoomType } from '../../Models/Room';

describe('RoomRepository', () => {
  let roomRepository;

  beforeEach(() => {
    roomRepository = new RoomRepository();
  });

  test('getAvailability should return all rooms', () => {
    const availability = roomRepository.getAvailability();
    expect(availability.length).toBe(3);
    expect(availability[0].type).toBe(RoomType.NORMAL);
    expect(availability[1].type).toBe(RoomType.OXYGEN);
    expect(availability[2].type).toBe(RoomType.ICU);
  });

  test('reserveRoom should decrease room quantity', () => {
    const initialAvailability = roomRepository.getAvailability();
    const initialNormalRooms = initialAvailability.find(room => room.type === RoomType.NORMAL).quantity;

    roomRepository.reserveRoom(RoomType.NORMAL);

    const newAvailability = roomRepository.getAvailability();
    const newNormalRooms = newAvailability.find(room => room.type === RoomType.NORMAL).quantity;

    expect(newNormalRooms).toBe(initialNormalRooms - 1);
  });
});
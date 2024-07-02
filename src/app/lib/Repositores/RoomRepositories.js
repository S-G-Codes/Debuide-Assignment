// RoomRepository.js
import { Room, RoomType } from '../Models/Room';

export class RoomRepository {
  constructor() {
    this.rooms = [
      new Room(RoomType.NORMAL, 50),
      new Room(RoomType.OXYGEN, 50),
      new Room(RoomType.ICU, 20)
    ];
  }

  // returns rooms object
  getAvailability() {
    return this.rooms.map(room => new Room(room.type, room.quantity));
  }

  reserveRoom(type) {
    const room = this.rooms.find(r => r.type === type);
    if (room && room.quantity > 0) {
      room.quantity--;
      return true;
    }
    return false;
  }


  releaseRoom(type) {
    const room = this.rooms.find(r => r.type === type);
    if (room) {
      room.quantity++;
    }
  }
  
}



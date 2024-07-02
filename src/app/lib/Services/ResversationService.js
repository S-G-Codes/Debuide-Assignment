import { RoomType } from '../Models/Room';
import { EquipmentType } from '../Models/Equiment';
import { Reservation } from '../Models/Resveration';
import { RoomRepository } from '../Repositores/RoomRepositories';
import { EquipmentRepository } from '../Repositores/EquipmentRepository';

export class ReservationService {

  constructor() {
    // creatuing new instances for room repo and equipment repositories
    this.roomRepo = new RoomRepository();
    this.equipmentRepo = new EquipmentRepository();
  }

//   tghis fn responsible for making reservation request handles if reserve room succeed and equiment fail
makeReservation(roomType) {
  
    if (!this.canReserve(roomType)) {
      return null;
    }
  
  
    const roomReserved = this.roomRepo.reserveRoom(roomType);
  
  
    if (roomReserved) {
      const equipmentReserved = this.reserveEquipmentForRoom(roomType);
      

      if (!equipmentReserved) {
        this.roomRepo.releaseRoom(roomType);
        return null;
      }
      
    
      return new Reservation(roomType, this.generatePatientId());
    }
  

    return null;
  }

//   responsible for checking room and equimetn is available or n
  canReserve(roomType) {
    const roomAvailable = this.roomRepo.getAvailability().find(r => r.type === roomType && r.quantity > 0);
    if (!roomAvailable) return false;

    const equipmentAvailable = this.getRequiredEquipment(roomType).every(
      ([type, quantity]) => this.equipmentRepo.getAvailability().find(e => e.type === type && e.quantity >= quantity)
    );

    return equipmentAvailable;
  }

  reserveEquipmentForRoom(roomType) {
    const requiredEquipment = this.getRequiredEquipment(roomType);
  
    // Check if all required equipment can be reserved
    const canReserveAllEquipment = requiredEquipment.every(([type, quantity]) =>
      this.equipmentRepo.getAvailability().find(e => e.type === type && e.quantity >= quantity)
    );
  
   
    if (canReserveAllEquipment) {
      requiredEquipment.forEach(([type, quantity]) => {
        this.equipmentRepo.reserveEquipment(type, quantity);
      });
      return true;
    }
    

    return false;
  }

  getRequiredEquipment(roomType) {
    switch (roomType) {
      case RoomType.NORMAL:
        return [
          [EquipmentType.FLAT_BED, 1],
          [EquipmentType.NORMAL_MASK, 2]
        ];
      case RoomType.OXYGEN:
        return [
          [EquipmentType.OXYGEN_CYLINDER, 2],
          [EquipmentType.RECLINER_BED, 1],
          [EquipmentType.NON_REBREATHER_MASK, 2]
        ];
      case RoomType.ICU:
        return [
          [EquipmentType.VENTILATOR, 1],
          [EquipmentType.RECLINER_BED, 1],
          [EquipmentType.OXYGEN_CYLINDER, 1]
        ];
    }
  }

  getRemainingAvailability() {
    return this.roomRepo.getAvailability();
  }

  generatePatientId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
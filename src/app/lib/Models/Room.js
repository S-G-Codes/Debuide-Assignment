// Room.js
export const RoomType = {
    NORMAL: 'Normal Room',
    OXYGEN: 'Oxygen Room',
    ICU: 'ICU'
  };
  
  export class Room {
    constructor(type, quantity) {
      this.type = type;
      this.quantity = quantity;
    }
  }
  
  // Equipment.js
  export const EquipmentType = {
    FLAT_BED: 'Flat Bed',
    RECLINER_BED: 'Recliner Bed',
    VENTILATOR: 'Ventilator',
    OXYGEN_CYLINDER: 'Oxygen Cylinder',
    NORMAL_MASK: 'Normal Mask',
    NON_REBREATHER_MASK: 'Non Rebreather Mask'
  };
  
  export class Equipment {
    constructor(type, quantity) {
      this.type = type;
      this.quantity = quantity;
    }
  }
  
  // Reservation.js
  export class Reservation {
    constructor(roomType, patientId) {
      this.roomType = roomType;
      this.patientId = patientId;
    }
  }
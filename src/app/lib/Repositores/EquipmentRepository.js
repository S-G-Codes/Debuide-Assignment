import { Equipment, EquipmentType } from '../Models/Equiment';

export class EquipmentRepository {
  constructor() {
    this.equipment = [
      new Equipment(EquipmentType.FLAT_BED, 80),
      new Equipment(EquipmentType.RECLINER_BED, 100),
      new Equipment(EquipmentType.VENTILATOR, 16),
      new Equipment(EquipmentType.OXYGEN_CYLINDER, 110),
      new Equipment(EquipmentType.NORMAL_MASK, 200),
      new Equipment(EquipmentType.NON_REBREATHER_MASK, 120)
    ];
  }

  getAvailability() {
    return this.equipment.map(eq => new Equipment(eq.type, eq.quantity));
  }

  reserveEquipment(type, quantity) {
    const eq = this.equipment.find(e => e.type === type);
    if (eq && eq.quantity >= quantity) {
      eq.quantity -= quantity;
      return true;
    }
    return false;
  }
}
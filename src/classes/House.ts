import { Key } from './Key';
import { Person } from './Person';

export abstract class House {
  protected door: boolean = false;
  protected key: Key;
  public tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): boolean {
    if (this.door) {
      this.tenants.push(person);
      return true;
    }
    return false;
  }

  abstract openDoor(key: Key): boolean;

  isDoorOpen(): boolean {
    return this.door;
  }
}
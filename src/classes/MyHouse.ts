import { House } from './House';
import { Key } from './Key';

export class MyHouse extends House {
  openDoor(key: Key): boolean {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      return true;
    }
    return false;
  }
}
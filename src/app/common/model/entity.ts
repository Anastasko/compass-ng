export class Entity {

  id?: number;

  constructor(options: any) {
    if (!options) {
      return;
    }
    this.id = options.id;
  }

}

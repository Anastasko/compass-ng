import { config } from '../../config';
import { Http, Response } from "@angular/http";
import { Entity } from '../model/entity';
import { ServiceLocator } from "../../service-locator.service";

export abstract class Service<T extends Entity> {

  protected _http: Http;

  abstract prefix(): string;

  abstract getInstance(o: any): T;

  constructor() {
    this._http = ServiceLocator.injector.get(Http);
  }

  findAll(): Promise<T[]> {
    return this.getRequest('');
  }

  protected getRequest(suffix: string): Promise<T[]> {
    return this._http.get(config.endpoint + this.prefix() + suffix)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

  findOne(id: number): Promise<T> {
    return this._http.get(config.endpoint + this.prefix() + '/' + id)
      .toPromise()
      .then(res => {
        return this.getInstance(res.json());
      });
  }

  create(entity: T): Promise<number> {
    return this._http.post(config.endpoint + this.prefix(), entity)
      .toPromise()
      .then(res => {
        return +res.text();
      });
  }

  update(entity: T): Promise<Response> {
    return this._http.put(config.endpoint + this.prefix(), entity)
      .toPromise();
  }

  delete(entity: T): Promise<Response> {
    return this._http.delete(config.endpoint + this.prefix() + '/' + entity.id)
      .toPromise();
  }

  getFields(): any[] {
    return [];
  }

  merge(item: T, newItem: T) {
    this.getFields().forEach(f => {
      item[f.fieldName] = newItem[f.fieldName];
    });
  }


}

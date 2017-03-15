import { config } from '../../config';
import { Http, Response } from "@angular/http";
import { ServiceLocator } from "../../service-locator.service";
import { UrlResource } from "../model/url-resource";
import { Injectable } from "@angular/core";

@Injectable()
export class UrlResourceService {

  protected _http: Http;

  prefix(): string {
    return '/uploads';
  }

  getInstance(o: any): UrlResource {
    return new UrlResource(o);
  }

  constructor() {
    this._http = ServiceLocator.injector.get(Http);
  }

  findAll(prefix: string): Promise<UrlResource[]> {
    return this.getRequest(`?prefix=${prefix}`).then(data => {
      return data.map(d => {
        return {
          url: d
        }
      })
    });
  }

  protected getRequest(suffix: string): Promise<UrlResource[]> {
    return this._http.get(config.endpoint + this.prefix() + suffix)
      .map(res => {
        return res.json();
      })
      .toPromise();
  }

}

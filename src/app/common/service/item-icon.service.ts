import { config } from '../../config';
import { Http, Response } from "@angular/http";
import { ServiceLocator } from "../../service-locator.service";
import { UrlResource } from "../model/url-resource";
import { Injectable } from "@angular/core";
import {EntityCityItem} from "../../api/model/entity-city-item";
import {AndroidIconService} from "../../api/service/android-icon.service";
import {EntityAndroidIcon} from "../../api/model/entity-android-icon";
import {EntityItemKind} from "../../api/model/entity-item-kind";
import {ItemKindService} from "../../api/service/item-kind.service";
import {Entity} from "../model/entity";

@Injectable()
export class ItemIconService {

  private kinds = new Map<number, EntityItemKind>();
  private icons = new Map<number, EntityAndroidIcon>();

  private fetched = false;

  constructor(private itemKindService: ItemKindService,
              private androidIconService: AndroidIconService){

  }

  _getIconUrl(itemKind: Entity): string {
    return config.endpoint + this.icons.get(this.kinds.get(itemKind.id).androidIcon.id).hdpi.url
  }

  init(){
    return this.itemKindService.findAll().then(kinds => {
      kinds.forEach(kind => {
        this.kinds.set(kind.id, kind);
      });
    }).then(() => {
      return this.androidIconService.findAll().then((icons: EntityAndroidIcon[]) => {
        icons.forEach(icon => {
          this.icons.set(icon.id, icon);
        });
      })
    });
  }

}

import {Component, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EntityItemKind} from "../api/model/entity-item-kind";
import {ItemKindService} from "../api/service/item-kind.service";

@Component({
  selector: 'x-map',
  templateUrl: 'item-kinds.component.html'
})
export class ItemKindsComponent {

  kinds: EntityItemKind[];

  @ViewChild('itemKindForm') itemKindForm: any;
  private showForm: boolean = false;

  private sub: any;

  constructor(private itemKindService: ItemKindService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
      this.itemKindService.findAll()
        .then((kinds: EntityItemKind[]) => {
          this.kinds = kinds;
        });
  }

  callback(item){
    if (item){
      this.kinds.push(item);
    }
    this.showForm = false;
  }

  update(map: EntityItemKind) {
    this.showForm = true;
    this.itemKindForm.render(map);
  }

  add() {
    this.update(new EntityItemKind({}));
  }

}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MapService } from '../api/service/map.service';
import { EntityMap } from  '../api/model/entity-map';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import { config } from "../config";
import { EntityMapItem } from "../api/model/entity-map-item";
import { MapItemService } from "../api/service/map-item.service";
import {MapItemsListComponent} from "./map-item-list/map-items-list.component";
import {utils} from '../common/utils';

@Component({
  selector: 'map',
  templateUrl: `./map.edit.component.html`,
  providers: [MapService],
  styleUrls: [
    'map-item-tooltip.css'
  ]
})
export class MapEditComponent implements OnInit, OnDestroy {

  map: EntityMap;

  @ViewChild('mapItemForm') mapItemForm: any;

  @ViewChild(MapItemsListComponent) mapItemsListComponent: MapItemsListComponent;

  status: string = "Loading ...";

  private showForm: boolean = false;
  private hideMenu: boolean = true;
  private hideMapMenu: boolean = true;
  private dragging: boolean = false;
  private tooltip: any;
  private sub: any;
  private mapItemRadius = 8;
  private mapItems: EntityMapItem[];
  private svg: any;
  private owner: EntityMap;
  private transform: any = {
    x: 0,
    y: 0,
    k: 1
  };
  contextMenuItemIndex: number;
  prevPath: any;

  constructor(private _mapService: MapService,
              private route: ActivatedRoute,
              private mapItemService: MapItemService) {

  }

  callback(item){
    if (item){
      this.mapItems.push(item);
    }
    this.showForm = false;
  }

  update(item: EntityMapItem) {
    this.showForm = true;
    this.mapItemForm.render(item);
  }

  add() {
    this.update(new EntityMapItem({}));
  }

  edit() {
    let mapItem = this.mapItems[this.contextMenuItemIndex];
    this.update(mapItem);
  }

  onRoomSelected(room){
    this.handleSelected(room);
  }

  clicked(event){
    let name = event.target.nodeName;
    if (name === 'path') {
      let id = event.target.id;
      let managed = this.findByRoom(id.substr(4))
      if (!managed){
        alert('can not be selected yet, reason: entity is not managed in db.');
      } else {
        this.handleSelected(managed);
      }
    }
  }

  handleSelected(item: EntityMapItem){
    let path = 'path' + (item && item.room);
    let el = document.getElementById(path);
    if (this.prevPath) {
      this.makeUnselected(this.prevPath);
    }
    if (item != null && el == null){
      alert('Will not be hightlited. Path #' + path + ' is not present in svg.');
      item = null;
    }
    if (item == null || this.prevPath == el){
      this.prevPath = null;
      this.mapItemsListComponent.setActive(null, true);
    } else {
      this.prevPath = el;
      this.makeSelected(el);
      this.mapItemsListComponent.setActive(item, true);
    }
  }

  private findByRoom(room: string) {
    let res = null;
    this.mapItems.forEach(item => {
      if (item.room == room){
        res = item;
      }
    });
    return res;
  }

  makeSelected(el){
    el.setAttribute('was-fill', el.style.fill);
    el.style.fill = 'blue';
  }

  makeUnselected(el){
    el.style.fill = el.getAttribute('was-fill');
    el.setAttribute('was-fill', '');
  }

  isSelected(el){
    return el.getAttribute('was-fill') && el.getAttribute('was-fill').length > 0;
  }

  ngOnInit() {
    this.tooltip = d3.select(".tooltip");
    this.sub = this.route.params.subscribe(params => {
      this.owner = new EntityMap({
        id: +params['id']
      });
      this._mapService.findOne(this.owner.id)
        .then(map => {
          this.map = map;
          this.map.getMapItems().then((items: EntityMapItem[]) => {
            items.sort(utils.attrComparator('room'));
            this.mapItems = items;
            this.initMap();
          });
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initMap() {
    let that = this;
    this.svg = d3.select("#map")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(d3.zoom().on("zoom", function () {
        that.hideMenu = true;
        let transform = d3.event.transform;
        that.transform = transform;
        that.svg.attr("transform", 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
        d3.selectAll('.map-item').attr('r', that.mapItemRadius / transform.k);
      }))
      .append("g");

    d3.xml(config.endpoint + this.map.image.url,
      function (error, documentFragment) {
        if (error) {
          console.log(error);
          return;
        }
        var svgNode = documentFragment
          .getElementsByTagName("svg")[0];
        let node: any = that.svg.node();
        node.appendChild(svgNode);
        that.initMapItems();
        that.status = "OK";
      });
    d3.select('#map').on('click', () => {
      that.hideTooltipAndMenu();
    });
  }

  initMapItems() {
    let that = this;
    this.svg.selectAll(".map-item")
      .data(this.mapItems)
      .enter().append("circle")
      .attr("data-index", (v, i) => {
        return i;
      })
      .on("click", v => {
        that.tooltip
          .text(v.id)
          .style("left", (that.transform.x + v.x * that.transform.k - 30) + "px")
          .style("top", (70 + that.transform.y + v.y * that.transform.k - 12) + "px")
          .style("display", "block");
        d3.event.stopPropagation();
      })
      .on("contextmenu", function () {
        let position = d3.mouse(this);
        that.contextMenuItemIndex = this.dataset.index;
        that.hideMenu = false;
        d3.select('#map_item_menu')
          .style('position', 'absolute')
          .style('left', (that.transform.x + position[0] * that.transform.k) + "px")
          .style('top', (85 + that.transform.y + position[1] * that.transform.k) + "px");
        d3.event.preventDefault();
      })
      .attr("class", "map-item")
      .attr("cx", function (d: any) {
        return d.x;
      })
      .attr("cy", function (d: any) {
        return d.y;
      })
      .attr("r", this.mapItemRadius)
      .style("fill", 'orange')
      .style("cursor", "move")
      .call(d3.drag()
        .on("start", function () {
          that.dragging = true;
          that.hideTooltipAndMenu();
          d3.select(this).raise().style("fill", 'green');
        })
        .on("drag", function (d: any) {
          d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
        })
        .on("end", function () {
          d3.select(this).style("fill", 'orange');
          that.dragging = false;
        }))
      .on("mouseover", function () {
        if (!that.dragging) {
          d3.select(this).style("fill", 'orangered');
        }
      })
      .on("mouseout", function () {
        if (!that.dragging) {
          d3.select(this).style("fill", "orange");
        }
      });
  }


  hideTooltip() {
    this.tooltip.style("display", "none");
  }

  hideTooltipAndMenu() {
    this.hideTooltip();
    this.hideMenu = true;
    this.hideMapMenu = true;
  }

}

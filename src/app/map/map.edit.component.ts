import { Component, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { MapService } from '../api/service/map.service';
import { EntityMap } from  '../api/model/entity-map';
import { Routes, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import * as d3 from 'd3';
import { config } from "../config";
import { Entity } from "../common/model/entity";
import { EntityMapItem } from "../api/model/entity-map-item";
import { MapItemService } from "../api/service/map-item.service";

@Component({
  selector: 'map',
  template: `
        <div [hidden]="showForm">
          Map: #{{map?.id}}  {{status}}
          <div id="map" style="height: calc(100vh - 110px); border: 1px solid black"></div>
          <div id="map_item_menu" [style.display]="hideMenu ? 'none' : 'block'">
            <button (click)="edit()">
              edit
            </button>
          </div>
          <div id="map_menu" [style.display]="hideMapMenu ? 'none' : 'block'">
            <button (click)="create()">
              create
            </button>
          </div>
          <div class="tooltip" style="display: none">
            tooltip
          </div>
        </div>
        
        <dynamic-form #mapItemForm
              [service]="mapItemService"
              [hidden]="!showForm"
              (callback)="callback($event)">

        </dynamic-form>
      `,
  providers: [MapService],
  styleUrls: [
    'map-item-tooltip.css'
  ]
})
export class MapEditComponent implements OnInit, OnDestroy {

  @Input()
  map: EntityMap;

  @ViewChild('mapItemForm') mapItemForm: any;

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

  constructor(private _mapService: MapService,
              private route: ActivatedRoute,
              private mapItemService: MapItemService) {

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
          this.initMap();
        });
    });
  }

  create() {
    let mapItem = new EntityMapItem({
      owner: { id: this.owner.id }
    });
    this.mapItemForm.render(mapItem);
    this.showForm = true;
  }

  edit() {
    let mapItem = this.mapItems[this.contextMenuItemIndex];
    this.mapItemForm.render(mapItem);
    this.showForm = true;
  }

  callback(mapItem: EntityMapItem) {
    this.showForm = false;
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
        that.owner.getMapItems().then((mapItems: EntityMapItem[]) => {
          that.mapItems = mapItems;
          that.initMapItems();
        });
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

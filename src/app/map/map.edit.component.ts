import {Component, Input, OnInit, OnDestroy, NgZone} from '@angular/core';
import {MapService} from '../api/service/map.service';
import {EntityMap} from  '../api/model/entity-map';
import {Routes, ActivatedRoute} from '@angular/router';
import {Http, Response} from '@angular/http';
import * as d3 from 'd3';
import {config} from "../config";
import {Entity} from "../common/model/entity";

@Component({
    selector: 'map',
    template: `Map: #
        {{map?.id}}  {{status}}
        <div id="map" style="height: calc(100vh - 110px); border: 1px solid black"></div>
        <div id="map_item_menu" [style.display]="hideMenu ? 'none' : 'block'">
          123
        </div>
        <div class="tooltip" style="display: none">
        tooltip
        </div>
      `,
    providers: [MapService],
    styleUrls: [
      'map-item-tooltip.css'
    ]
})
export class MapEditComponent implements OnInit, OnDestroy {

    @Input()
    map: EntityMap;

    status: string = "Loading ...";

    private hideMenu: boolean = true;
    private dragging: boolean = false;
    private tooltip: any;
    private sub: any;
    private mapItemRadius = 8;
    private mapItems: any[];
    private svg: any;
    private owner: Entity;
    private transform: any = {
      x: 0,
      y: 0,
      k: 1
    };

    constructor(private _http: Http,
                private _mapService: MapService,
                private route: ActivatedRoute,
                private ngZone: NgZone) {

    }

    ngOnInit() {
        this.tooltip = d3.select(".tooltip");
        this.sub = this.route.params.subscribe(params => {
            this.owner = new Entity({
              id: +params['id']
            });
            this._mapService.findOne(this.owner.id)
                .then(map => {
                    this.map = map;
                    this.initMap();
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
          that.hideMenu = true;
          that.tooltip.style("display", "none");
        });
    }

    initMapItems() {
        this.mapItems=[{
          id: 44,
          x: 100,
          y: 400
        }];
        let that = this;
        this.svg.selectAll(".map-item")
            .data(this.mapItems)
            .enter().append("circle")
            .on("click", v => {
                that.tooltip
                  .text(v.id)
                  .style("left", (that.transform.x + v.x * that.transform.k - 30) + "px")
                  .style("top", (70 + that.transform.y + v.y * that.transform.k - 12) + "px")
                  .style("display", "block");
                d3.event.stopPropagation();
            })
            .on("contextmenu", function() {
              let position = d3.mouse(this);
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
                    that.tooltip.style("display", "none");
                    d3.select(this).raise().style("fill", 'green');
                    that.hideMenu = true;
                })
                .on("drag", function (d: any) {
                    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
                })
                .on("end", function () {
                    d3.select(this).style("fill", 'orange');
                    that.dragging = false;
                }))
            .on("mouseover", function() {
              if (!that.dragging){
                  d3.select(this).style("fill", 'orangered');
              }
            })
            .on("mouseout", function() {
              if (!that.dragging){
                d3.select(this).style("fill", "orange");
              }
            });
    }


}

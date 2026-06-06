import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js';

import { DESTINATIONS, Destination } from '../../data/destinations';

@Component({
  selector: 'app-map-view',
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  destination: Destination | undefined;
  map: Map | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.destination = DESTINATIONS.find(item => item.id === id);
  }

  ngAfterViewInit(): void {
    if (!this.destination) {
      return;
    }

    this.initializeMap();
  }

  initializeMap(): void {
    if (!this.destination) {
      return;
    }

    const coordinate = fromLonLat([this.destination.lng, this.destination.lat]);

    const markerFeature = new Feature({
      geometry: new Point(coordinate),
      name: this.destination.name
    });

    markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.08
        })
      })
    );

    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [markerFeature]
      })
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        markerLayer
      ],
      view: new View({
        center: coordinate,
        zoom: 11
      })
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  }
}
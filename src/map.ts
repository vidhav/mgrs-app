import { Map as OpenLayers, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { Circle, Fill, Stroke, Style } from 'ol/style';

export const markerStyle: Style[] = [
    new Style({
        image: new Circle({
            fill: new Fill({ color: '#000000' }),
            radius: 3,
            stroke: new Stroke({ color: '#000000', width: 1 }),
        }),
    }),
    new Style({
        image: new Circle({
            stroke: new Stroke({ color: '#000000', width: 1 }),
            radius: 8,
        }),
    }),
];

export const map = new OpenLayers({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({ center: fromLonLat([12.819, 64.889]), zoom: 4 }),
});

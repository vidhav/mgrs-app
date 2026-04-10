import { forward } from 'mgrs';
import { Feature, type MapBrowserEvent } from 'ol';
import { type Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { toLonLat } from 'ol/proj';
import { Vector } from 'ol/source';
import van from 'vanjs-core';
import { define } from 'vanjs-element';

import { iconClose, iconCopy } from './icons';
import { map, markerStyle } from './map';

const { button, data, div } = van.tags;
const ACCURACY = 5;

define(
    'mgrs-content',
    ({ mount, $this }) => {
        $this.classList.add('bg-light', 'border-top', 'border-dark', 'p-3');

        const layer = new VectorLayer({
            source: new Vector({ features: [] }),
            style: markerStyle,
        });

        const coordinate = van.state<Coordinate | null>(null);

        const handleClick: any = (event: MapBrowserEvent<PointerEvent>) => {
            coordinate.val = event.coordinate;
        };

        mount(() => {
            map.on('singleclick', handleClick);
            map.addLayer(layer);
            return () => {
                map.un('singleclick', handleClick);
                map.removeLayer(layer);
            };
        });

        van.derive(() => {
            const source = layer.getSource() as Vector<Feature>;
            source.clear();

            if (coordinate.val) {
                const point = new Point(coordinate.val);
                const feature: Feature<Point> = new Feature(point);
                source.addFeature(feature);
            }
        });

        const disabled = van.derive(() => coordinate.val === null);

        const mgrs = van.derive(() => {
            if (coordinate.val === null) return '';
            const [lng, lat] = toLonLat(coordinate.val);
            return forward([lng, lat], ACCURACY);
        });

        const display = van.derive(() => {
            if (mgrs.val === '') return '-';
            return [
                mgrs.val.substring(0, 3),
                mgrs.val.substring(3, 5),
                mgrs.val.substring(5, 5 + ACCURACY),
                mgrs.val.substring(5 + ACCURACY, 5 + ACCURACY + ACCURACY),
            ].join(' ');
        });

        return [
            div(
                { class: 'd-flex justify-content-between' },
                button(
                    {
                        class: 'btn btn-sm btn-light',
                        disabled: () => disabled.val,
                        onclick: () => {
                            if (mgrs.val === '') return;
                            navigator.clipboard.writeText(mgrs.val);
                        },
                        type: 'button',
                    },
                    iconCopy(),
                ),
                data(
                    { class: 'font-monospace fs-5', value: () => mgrs.val },
                    () => display.val,
                ),
                button(
                    {
                        class: 'btn btn-sm btn-light',
                        disabled: () => disabled.val,
                        onclick: () => (coordinate.val = null),
                        type: 'button',
                    },
                    iconClose(),
                ),
            ),
        ];
    },
    false,
);

export default van.tags['mgrs-content'];

import { fromLonLat } from 'ol/proj';
import van from 'vanjs-core';
import { define } from 'vanjs-element';
import { iconCompass, iconMap } from './icons';
import { map } from './map';

const { a, button, div, span } = van.tags;

define(
    'mgrs-header',
    ({ $this }) => {
        $this.classList.add(
            'navbar',
            'border-bottom',
            'border-dark',
            'border-body',
        );

        return [
            div(
                { class: 'container-fluid' },
                a(
                    { class: 'navbar-brand', href: location.pathname },
                    iconMap(),
                    span({ class: 'ms-2' }, 'MGRS'),
                ),
                button(
                    {
                        class: 'btn btn-sm btn-light',
                        disabled: 'geolocation' in navigator ? false : true,
                        onclick: () =>
                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    const center = fromLonLat([
                                        position.coords.longitude,
                                        position.coords.latitude,
                                    ]);
                                    const view = map.getView();
                                    view.setCenter(center);
                                    view.setZoom(14);
                                },
                            ),
                        type: 'button',
                    },
                    iconCompass(),
                ),
            ),
        ];
    },
    false,
);

export default van.tags['mgrs-header'];

import van from 'vanjs-core';
import { define } from 'vanjs-element';

import { map } from './map';

define(
    'mgrs-container',
    ({ mount, $this }) => {
        $this.classList.add('h-100');

        mount(() => {
            map.setTarget($this);
            return () => map.setTarget(undefined);
        });

        return [];
    },
    false,
);

export default van.tags['mgrs-container'];

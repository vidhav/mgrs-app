import van from 'vanjs-core';

import Container from './container';
import Content from './content';
import Header from './header';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'ol/ol.css';

import './style.css';

const { main } = van.tags;

van.add(
    document.body,
    main(
        { class: 'd-flex flex-column h-100' },
        Header(),
        Container(),
        Content(),
    ),
);

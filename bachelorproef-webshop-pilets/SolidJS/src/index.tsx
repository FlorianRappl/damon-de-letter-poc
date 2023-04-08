import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { lazy } from 'solid-js';
import type { PiletApi } from 'bachelorproef-app-shell';

const Page = lazy(() => import('./Page'));

export function setup(app: PiletApi) {
  app.registerPage('/solid', app.fromSolid(Page));

  app.registerMenu(() => createElement(Link, { to: "/solid" }, 'Solid'));
}

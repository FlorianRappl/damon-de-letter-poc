import Page from './Page.svelte';
import type { PiletApi} from "bachelorproef-app-shell";

export function setup(app: PiletApi) {
  app.registerPage('/svelte', app.fromSvelte(Page));
}
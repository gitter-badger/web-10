import {Router, RouterConfiguration} from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { ApplicationState } from './appState';

@autoinject
export class App {
  router: Router;

  constructor(private appState: ApplicationState) {
    
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Andromia';
    config.map([
      //{ route: ['', 'login'],   name: 'login',        moduleId: 'login',     title: 'Connexion Andromia' },
      //{ route: 'subscribe',     name: 'todo',         moduleId: 'todo',      title: 'Subscribe' },
      { route: ['', 'dashboard'],     name: 'dashboard',    moduleId: 'dashboard', title: 'Andromia Dashboard', href:"#dashboard" }
    ]);

    this.router = router;
  }



}

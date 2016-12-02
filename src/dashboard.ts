import { autoinject, bindable } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router'
import { EventAggregator } from 'aurelia-event-aggregator';


import 'jquery';

declare var jQuery: any;

@autoinject
export class Dashboard {
    router: Router;
    sidebar: any;
    isSidebarCollapse: boolean;

    constructor(private element: Element, private eventAggregator: EventAggregator) {
        this.isSidebarCollapse = false;

        //Subscribe to sidebar toggle
        this.eventAggregator.subscribe('toggleSidebar', () => {
            this.handleToggleSidebar();
        })


    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.options.pushState = true;
        config.options.root = '/';
        config.map([
            { route: ['', 'portals'], name: 'portals', moduleId: 'portals', nav: false, title: 'Portals' },
        ]);

        this.router = router;
    }

    handleToggleSidebar() {
        if (jQuery('body').is('.nav-collapsed')) {
            this.expandNavigation()
        } else {
            this.collapseNavigation();
        }
    }

    expandNavigation() {
        jQuery('body').removeClass('nav-collapsed');
        jQuery('body').addClass('nav-open');
        jQuery('#sidebar').find('.active .active').closest('.collapse').collapse('show')
            .siblings('[data-toggle=collapse]').removeClass('collapsed');

    }

    collapseNavigation() {
        jQuery('body').removeClass('nav-open');
        jQuery('body').addClass('nav-collapsed');
        jQuery('#sidebar').find('.collapse.in').collapse('hide')
            .siblings('[data-toggle=collapse]').addClass('collapsed');

    }

}
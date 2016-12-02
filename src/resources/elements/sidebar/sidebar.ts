import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApplicationState } from '../../../appState';

import 'jquery';
import 'jquery-slimscroll';

declare var $: any;

@autoinject
export class Sidebar {
    title = 'Andromia'
    isOpen : boolean = true ;

    constructor(private element: Element, private eventAggregator: EventAggregator, private appState: ApplicationState) {
        this.element = element;
        this.appState = appState;

    }

    attached() {
        this.initSlimScroll();

        //Subscribe to sidebar toggle
        this.eventAggregator.subscribe('toggleSidebar', () => {
            this.handleToggleSidebar();
        });
    
    }

    initSlimScroll(): void {
        var $sidebarContent = $('.js-sidebar-content');
        if ($('#sidebar').find('.slimScrollDiv').length != 0) {
            $sidebarContent.slimscroll({
                destroy: true
            })
        }
        $sidebarContent.slimscroll({
            height: window.innerHeight,
            size: '4px'
        });
    }

    handleToggleSidebar(): void {
        if(this.isOpen)
        {
            this.isOpen = !this.isOpen;
            
        } else {
            setTimeout(() => {
                this.isOpen = !this.isOpen;
            }, 150);
        }
    }
}
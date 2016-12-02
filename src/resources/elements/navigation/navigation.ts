import {inject, autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@autoinject
export class Navigation {
    title = 'Andromia';  
    constructor(private eventAggregator: EventAggregator) {

    }

    notifyToggleSidebar(state) : void {
        this.eventAggregator.publish('toggleSidebar');
    }
}
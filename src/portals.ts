import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject
export class Portals {
    portals = [];

    activate(params, routeConfig) {
        let client = new HttpClient();  
        
        client.configure(config => {
            config.withDefaults({
                headers:{
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch',
                    "x-access-token":"Andromia"
                }
            })
        })
        

        client.fetch('https://inoxis-andromiabeta.rhcloud.com/portals')
                .then(response => response.json())
                .then(data => {
                    this.portals = data;

                    for(let i in this.portals) {
                        this.portals[i].newKey = this.portals[i].portalKey.substring(0,8)  + "-****-****-****-"+ this.portals[i].portalKey.substring(24,36) 
                    }

                });
    }

}
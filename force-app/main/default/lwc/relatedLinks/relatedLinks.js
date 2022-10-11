import { LightningElement,api,track,wire } from 'lwc';
import getAllRelatedObjects from '@salesforce/apex/relatedObject.getAllRelatedObjects';
export default class RelatedLinks extends LightningElement {
    @track mapData = [];
    @api recordId;
    @wire(getAllRelatedObjects,{rid:'$recordId'})
    wiredObjects({ error, data }) {
        if (data) {
            var objs = data;
            for(var key in objs){
                this.mapData.push({value:objs[key], key:key});
            }
        } else if (error) {
            console.log(error);
        }
}
}
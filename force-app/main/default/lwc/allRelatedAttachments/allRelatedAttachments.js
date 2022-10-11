import { LightningElement,track,wire,api } from 'lwc';
import getRelatedFilesByRecId from '@salesforce/apex/filePreviewController.getRelatedFilesByRecId';
import {NavigationMixin} from 'lightning/navigation';
export default class AllRelatedAttachments extends NavigationMixin(LightningElement) {
@track mapData=[];
@api recordId;
@track dismapData=[];
connectedCallback(){
    getRelatedFilesByRecId({ridg:this.recordId}).then(data=>{
        var objs=data;
        for(var key in objs){
            this.mapData.push({link:objs[key][5],date:objs[key][4],title:objs[key][0],extension:objs[key][2],size:objs[key][3],key:key});
        }
        
        console.log(this.dismapData);
    }).catch(e=>{
        console.log(JSON.stringify(e));
    });
}
previewHandler(event){
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
}
}
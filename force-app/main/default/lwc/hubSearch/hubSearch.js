import { LightningElement,track } from 'lwc';
import hubSearchBikes from '@salesforce/apex/searchHub.hubSearchBikes';
import addBikeMaintenance from '@salesforce/apex/bikeMaintenance.addBikeMaintenance';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class HubSearch extends LightningElement {
    @track hubValue='';
    comValue='';
    @track showModal=false;
    validity=true;
    bikeList=[];
    error;
    selectedBikes=[];
    list_ids_forbikes=[];
    lis=[]
    @track columns=[
        {
            label: 'Bike Name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Vehicle No.',
            fieldName: 'VehicleNo__c',
            type: 'text',
            sortable: true
        },
        {
            label: 'Distance Covered(in Km)',
            fieldName: 'KMCovered__c',
            type: 'text',
            typeAttributes: { maximumFractionDigits: '2' },
            sortable: true
        }
    ];
    isValid(){
        let taskField=this.template.querySelector(".val");
        let taskFieldValue=taskField.value;
        if(taskFieldValue===""){
            taskField.setCustomValidity("Hub Name is required");
            this.validity=false;
        }
        else{
            taskField.setCustomValidity("");
            this.validity=true;
        }
        taskField.reportValidity();
    }

    //Event Handling
    saveChanges(event){
        console.log('Saved');
        this.showModal=false;
        this.comValue=event.detail;
        console.log(this.comValue);
        for(var i=0; i<this.selectedBikes.length; i++){
            this.list_ids_forbikes.push(this.selectedBikes[i].Id);
        }
        this.list_ids_forbikes=[...new Set(this.list_ids_forbikes)];
        console.log(this.list_ids_forbikes[0]);
        addBikeMaintenance({i:this.list_ids_forbikes[0],com:this.comValue}).then((result)=>{
            const evt=new ShowToastEvent({
                title:'Maintenance',
                message:'Selected Bikes added for maintenance',
                variant:'success'
            });
            this.dispatchEvent(evt);
            console.log(result);
        }).catch((error)=>{
            const evt=new ShowToastEvent({
                title:'Error',
                message:'Error Occured while adding task',
                variant:'error'
            });
            this.dispatchEvent(evt);
            console.log('Error');
        });
    }
    closeModal(){
        this.showModal=false;
        console.log('Closing');
    }
    handleComChange(event){
        this.comValue=event.target.value;
    }
    handleClickMaintenance(event){

        if(this.selectedBikes.length==1){
            this.showModal=true;
        }else{
            const evt=new ShowToastEvent({
                title:'Caution',
                message:'Please Select a single record',
                variant:'info'
            });
            this.dispatchEvent(evt);
        }
        
    }
    handleClickDT(event){
        var selRec=this.template.querySelector("lightning-datatable").getSelectedRows();
        this.selectedBikes=selRec;
        console.log('Selected Rows');
        console.log(this.selectedBikes);
    }
    handleChange(event){
        this.hubValue=event.target.value;
    }
    handleClick(event){
        this.isValid();
        if(this.validity){
            hubSearchBikes({hub:this.hubValue}).then((result)=>{
                this.bikeList=result;
                this.error=undefined;
                console.log(this.bikeList);
            }).catch((error)=>{
                this.error=error;
                console.log(this.error);
            })
        }
    }
}
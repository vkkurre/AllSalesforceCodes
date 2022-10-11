import { LightningElement, api, track, wire } from 'lwc';
import inactiveBikes from '@salesforce/apex/bikeStatus.inactiveBikes';
import currentBookings from '@salesforce/apex/bikeStatus.currentBookings';
import pendingMaintainence from '@salesforce/apex/bikeStatus.pendingMaintainence';
export default class HubStatus extends LightningElement {
    @api recordId;
    record1=[];record2=[];record3=[];
    total_inactiveBikes=Number(0);
    total_bookedBikes=Number(0);
    total_servicebikes=Number(0);
    totalBikes1;totalBikes2;totalBikes3;
    val1;val2;val3;
   @wire(inactiveBikes,{hubid:'$recordId'})
   ICBikes({data,error}){
    if(data){
        this.record1=data;
        for(var i=0;i<this.record1.length;i++){
            if(this.record1[i].Active__c===true){
                this.total_inactiveBikes=this.total_inactiveBikes+1;
            }
        }
        this.totalBikes1=this.record1.length;
        this.val1=Number((this.total_inactiveBikes/this.totalBikes1)*100).toFixed(0);
        console.log(this.val1);
    }
    else if(error){
        console.log(error);
    }
   }
   @wire(currentBookings,{hubid:'$recordId'})
   CBooks({data,error}){
    if(data){
        this.record2=data;
        for(var i=0;i<this.record2.length;i++){
            if(this.record2[i].IsBooked__c===true){
                this.total_bookedBikes=this.total_bookedBikes+1;
            }
        }
        this.totalBikes2=this.record2.length;
        this.val2=Number((this.total_bookedBikes/this.totalBikes2)*100).toFixed(0);
        console.log(this.val2);
    }
    else if(error){
        console.log(error);
    }
   }
   @wire(pendingMaintainence,{hubid:'$recordId'})
   MainBikes({data,error}){
    if(data){
        this.record3=data;
        for(var i=0;i<this.record3.length;i++){
            if(this.record3[i].DueToService__c===true){
                this.total_servicebikes=this.total_servicebikes+1;
            }
        }
        this.totalBikes3=this.record3.length;
        this.val3=Number((this.total_servicebikes/this.totalBikes3)*100).toFixed(0);
        console.log(this.val3);
    }
    else if(error){
        console.log(error);
    }
   }
}
import { LightningElement, api, wire} from 'lwc';
import getUnpaidFare from '@salesforce/apex/duesBoooking.getUnpaidFare';
export default class OutstandingDues extends LightningElement {
    @api recordId;
    record=[];
    error;
    currency;
    @wire(getUnpaidFare,{contactid:'$recordId'})
    fare({error,data}){
        if(data){
            this.record=data;
            this.error=null;
            var total=0;
            console.log(this.record);
            for(let i=0;i<this.record.length;i++){
                var curr=Number(this.record[i].ActualFare__c);
                total=Number(total)+curr;
                console.log(total);
            }
            this.currency=total.toFixed(2);
        }
        else if(error){
            this.error=error;
        }
    }
}
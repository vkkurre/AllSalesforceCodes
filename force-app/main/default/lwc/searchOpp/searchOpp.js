import { LightningElement } from 'lwc';
import searchOppAmount from '@salesforce/apex/searchOppAmountClass.searchOppAmount';
export default class SearchOpp extends LightningElement {
amount='';
error=''
oppList=[]
handleChange(event){
    this.amount=event.target.value;
    searchOppAmount({amount: this.amount}).then((result)=>{
        this.oppList = result;
        this.error = undefined;
    }).catch((error)=>{
        this.error=error;
        this.oppList=undefined;
    });
}
}
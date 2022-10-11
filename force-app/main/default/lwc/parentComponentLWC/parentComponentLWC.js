import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/listAccount.getAccounts';
export default class ParentComponentLWC extends LightningElement {
@track accList=[];
error;
@wire(getAccounts)
accounts({error, data}){
    if(data){
        this.accList=data;
        console.log(data);
        this.error=undefined;
    }
    else if(error){
        this.error=error;
        console.log(this.error);
    }
}
}
import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/listContact.getContacts';
export default class ParentComponentLWC1 extends LightningElement {
@track contactList;
selectedContact;
error;
@wire(getContacts) 
contacts({data, error}){
    if(data){
        this.contactList=data;
        console.log(data);
        this.error=undefined;
    }
    else if(error){
        this.error=error;
        console.log(this.error);
    }
}
contactSelected(event){
const ContactId=event.detail;
this.selectedContact=this.contactList.find(contact=>this.contact.Id===ContactId);
}
}
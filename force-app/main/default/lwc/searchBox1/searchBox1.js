import { LightningElement, wire, track } from 'lwc';
import search from '@salesforce/apex/searchContacts.search';
export default class SearchBox1 extends LightningElement {
@track contactList=[];
contactName='';
@wire(search,{name:'$contactName'})
retrieveContacts({error,data}){
if(data){
    this.contactList=data;
    console.log(data);
}
else if(error){
    console.error(error);
}
}

handleChange(event){
    this.contactName=event.target.value;
}
}
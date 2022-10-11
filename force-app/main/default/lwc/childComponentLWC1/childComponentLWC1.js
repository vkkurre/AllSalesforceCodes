import { LightningElement, api } from 'lwc';

export default class ChildComponentLWC1 extends LightningElement {
    @api contact;
    selectHandler(event){
        event.preventDefault();
        const cust_event=new CustomEvent('selected',{detail: this.contact.Id});
        this.dispatchEvent(cust_event);
    }
}
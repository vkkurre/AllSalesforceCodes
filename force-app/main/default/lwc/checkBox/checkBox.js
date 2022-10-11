import { LightningElement } from 'lwc';

export default class CheckBox extends LightningElement {
    stat=true;
    handleCheckbox(event){
        this.stat=event.target.checked;
    }
}
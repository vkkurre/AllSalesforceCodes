import { LightningElement,api } from 'lwc';

export default class ModalComponent extends LightningElement {
    @api showModal;
    @api comment;
    handleChange(event){
        this.comment=event.target.value;
    }
    handleCloseButton(){
        this.dispatchEvent(new CustomEvent('close'));
    }
    handleSaveButton(){
        let saveEvent=new CustomEvent('save',{detail:this.comment})
        this.dispatchEvent(saveEvent);
    }
}
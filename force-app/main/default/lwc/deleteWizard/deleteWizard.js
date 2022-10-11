import { LightningElement,api } from 'lwc';

export default class DeleteWizard extends LightningElement {
    @api showDelModal;
    @api comId;
    handleCloseButton(){
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSaveButton(){
        let saveEvent=new CustomEvent('save',{detail:this.comId})
        this.dispatchEvent(saveEvent);
    }
}
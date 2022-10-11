import { LightningElement,api} from 'lwc';

export default class EditWizard extends LightningElement {
    @api showEditModal;
    @api comId;
    @api comment;
    
    handleComValueChanges(event){
        this.comment=event.target.value;
    }
    handleSaveButton(){
        let info={commentId:this.comId,commentBody:this.comment};
        let saveEvent=new CustomEvent('save',{detail:info});
        this.dispatchEvent(saveEvent);
    }
    handleCloseButton(){
        this.dispatchEvent(new CustomEvent('close'));
    }
}
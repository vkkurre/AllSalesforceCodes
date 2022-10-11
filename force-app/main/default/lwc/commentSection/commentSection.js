import { LightningElement, track,api, wire} from 'lwc';
import getAllCaseComments from '@salesforce/apex/CaseCommentController.getAllCaseComments';
import addCaseComment from '@salesforce/apex/CaseCommentController.addCaseComment';
import deleteCaseComment from '@salesforce/apex/CaseCommentController.deleteCaseComment';
import updateCaseComment from '@salesforce/apex/CaseCommentController.updateCaseComment';
import { refreshApex } from '@salesforce/apex';
import {NavigationMixin} from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
export default class CommentSection extends NavigationMixin(LightningElement) {
    @track commentBody;
    @api recordId;
    @track allComments=[];
    @track loading=true;
    @track isCommentAvail=false;
    @track showDelModal=false;
    @track showEditModal=false;
    @track selectedComId;
    @track selectedComment;
    wiredResults;
    userId=Id;
    connectedCallback(){
        console.log('RecId=>'+this.recordId);
        
    }
    @wire(getAllCaseComments,{caseid:'$recordId'})
    wiredComments(result){
        this.wiredResults=result;
        if(result.data){
            this.allComments=JSON.parse(JSON.stringify(result.data));
            for(let i=0;i<this.allComments.length;i++){
                if(this.allComments[i]['CreatedById']==this.userId){
                    this.allComments[i]['isCurrentUser']=true;
                }else{
                    this.allComments[i]['isCurrentUser']=false;
                }
                this.allComments[i]['time']=this.commentTime(this.allComments[i]['LastModifiedDate']).comDate;
                this.allComments[i]['isEdit']=this.commentTime(this.allComments[i]['LastModifiedDate']).editable;
            }
            if(this.allComments.length>0){
                this.isCommentAvail=true;
            }else{
                this.isCommentAvail=false;
            }
            this.loading=false;
        }
        else if(result.error){
            console.log(result.error);
            this.loading=false;
        }
    }

    handleUserNav(event){
        this[NavigationMixin.Navigate]({ 
            type:'standard__recordPage',
            attributes:{ 
                recordId: event.target.dataset.id,
                actionName: 'view'
            },
        });
    }
    handleAddComment(event){
        if(this.isCommentValid()){
            addCaseComment({caseid:this.recordId,comment:this.commentBody}).then(result=>{
                this.loading=true;
                this.template.querySelector(".comment").value=null;
                refreshApex(this.wiredResults);
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    changeBody(event){
        this.commentBody=event.target.value;
    }
    closeEditModal(){
        this.showEditModal=false;
    }
    closeDelModal(){
        this.showDelModal=false;
    }
    saveDelChanges(event){
        this.showDelModal=false;
        deleteCaseComment({commid:event.detail}).then(result=>{
            const evt=new ShowToastEvent({
                title:'Delete Comment',
                message:'Deleted Comment Successfully.',
                variant:'success'
            });
            this.dispatchEvent(evt);
            this.loading=true;
            refreshApex(this.wiredResults);
        }).catch(e=>{
            const evt=new ShowToastEvent({
                title:'Error',
                message:'Error Occured while deleting Comment.',
                variant:'error'
            });
            this.dispatchEvent(evt);
            console.log(e);
        });
        
    }
    saveEditChanges(event){
        this.showEditModal=false;
        updateCaseComment({commid:event.detail.commentId,comment:event.detail.commentBody}).then(result=>{
            const evt=new ShowToastEvent({
                title:'Edit Comment',
                message:'Comment Edited Successfully.',
                variant:'success'
            });
            this.dispatchEvent(evt);
            this.loading=true;
            refreshApex(this.wiredResults);
        }).catch(e=>{
            const evt=new ShowToastEvent({
                title:'Error',
                message:'Error Occured while Editing Comment.',
                variant:'error'
            });
            this.dispatchEvent(evt);
            console.log(e);
        });
    }
    editComment(event){
        this.selectedComId=event.target.value;
        this.selectedComment=event.target.dataset.com;
        this.showEditModal=true;
    }
    deleteComment(event){
        this.selectedComId=event.target.value;
        this.showDelModal=true;
    }
    commentTime(date){
        let formatter = new Intl.DateTimeFormat('en', {
            weekday: 'short',
            year: "numeric" ,
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: "true"
            });
            
        let formattedDate = formatter.format(Date.parse(date));
        let currentdate = new Date();
        let commentDate=new Date(Date.parse(date));
        let seconds = Math.round((currentdate.getTime() - commentDate.getTime()) / 1000);
        if(seconds>=180){
            let timeInfo={comDate:formattedDate,editable:false}
            return timeInfo;
        }
        else{
            let timeInfo={comDate:formattedDate,editable:true}
            return timeInfo;
        }
    }

    isCommentValid(){
        let commentField=this.template.querySelector(".comment");
        if(commentField.value=='' || commentField.value==null){
            commentField.setCustomValidity("Write a comment to add");
            commentField.reportValidity();
            return false;
        }
        else{
            commentField.setCustomValidity('');
            commentField.reportValidity();
            return true;
        }
    }
}
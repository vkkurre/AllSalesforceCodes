import { LightningElement, api} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import CONTACT_DOB from '@salesforce/schema/Contact.Birthdate';
import CONTACT_ACCOUNT_ID from '@salesforce/schema/Contact.AccountId';
export default class CreateContact extends NavigationMixin(LightningElement) {
    @api recordId;
    contactId;
    formFields={
        fname:'',
        lname:'',
        email:'',
        phone:'',
        dob:''
    }
    handleChange(event){
        const {value,name}=event.target;
        this.formFields={...this.formFields, [name]:value};
    }
    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }
    handleReset(event){
        this.template.querySelectorAll('lightning-input').forEach(element=>{
            element.value=null;
        });
    }
    handleSubmit(event){
        if(this.isInputValid){
        console.log(this.formFields);
        const fields={};
        fields[CONTACT_FNAME.fieldApiName]=this.formFields.fname;
        fields[CONTACT_LNAME.fieldApiName]=this.formFields.lname;
        fields[CONTACT_EMAIL.fieldApiName]=this.formFields.email;
        fields[CONTACT_PHONE.fieldApiName]=this.formFields.phone;
        fields[CONTACT_DOB.fieldApiName]=this.formFields.dob;
        fields[CONTACT_ACCOUNT_ID.fieldApiName]=this.recordId;
        console.log(fields);
        const record={apiName:CONTACT_OBJECT.objectApiName, fields};
        createRecord(record).then(contactResult=>{
            this.contactId=contactResult.id;
            this.dispatchEvent(new ShowToastEvent({
                title:"Successfully Record Created",
                message: "Contact Record has been created for this Account.",
                variant:"Success"
                }),
            );
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                    attributes: {
                        recordId: contactResult.id,
                        objectApiName: CONTACT_OBJECT.objectApiName,
                        actionName: 'view'
                    },
            });
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
        }
    }

}
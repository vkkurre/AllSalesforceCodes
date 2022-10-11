import { LightningElement, api, wire, track} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_IND_TYPE from '@salesforce/schema/Account.Industry';
import ACCOUNT_BILLING_STREET from '@salesforce/schema/Account.BillingStreet';
import ACCOUNT_BILLING_CITY from '@salesforce/schema/Account.BillingCity';
import ACCOUNT_BILLING_STATE from '@salesforce/schema/Account.BillingState';
import ACCOUNT_BILLING_COUNTRY from '@salesforce/schema/Account.BillingCountry';
import ACCOUNT_BILLING_PCODE from '@salesforce/schema/Account.BillingPostalCode';
import ACCOUNT_ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue';

export default class LwcWire1 extends LightningElement {
@api recordId;
@track result={};
@wire (getRecord,{recordId: '$recordId', fields:[ACCOUNT_NAME,ACCOUNT_PHONE,ACCOUNT_IND_TYPE,
    ACCOUNT_ANNUAL_REVENUE,ACCOUNT_BILLING_STREET,ACCOUNT_BILLING_CITY,ACCOUNT_BILLING_COUNTRY,
    ACCOUNT_BILLING_STATE,ACCOUNT_BILLING_PCODE]})
wiredRecord({error, data}){
    if(data){
        const {fields}=data;
        Object.keys(fields).forEach(item=>{
            let value=fields[item] && fields[item].displayValue ? fields[item].displayValue : fields[item].value;
            this.result={...this.result, [item]:value};
        });
    }
    else if(error){
        console.error(error);
    }
}
}
import { LightningElement, api, track, wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { refreshApex } from '@salesforce/apex';
import getProductList from '@salesforce/apex/Billing_ProductLineItem_Controller.getProductList';
export default class Bazaar_ProductLineItem extends LightningElement {

@track strSearchText = "";
@api recordId;
@track list_Products = [];
@track list_SelectedProducts = [];
@track wiredProducts;
@api blnShowProductsModal = false;
columns = [
            { label: 'Product Name', 
              fieldName: 'ProductName'
            },
            { label: 'Price per Unit', 
              fieldName: 'Unit_Price__c', 
              type: 'currency' 
            },
            { label: 'Expiration Date', 
              fieldName: 'Expiration_Date__c', 
              type: 'date' 
            }
          ];

    @wire(getProductList, { idBillingId : '$recordId',
                            strSearchKey : '$strSearchText' })
    allProductList( result ) {
        const { error, data } = result;
        this.wiredProducts = result;
        if (data) {
            if (data.blnIsSuccess) {
                this.list_Products = JSON.parse(JSON.stringify(data.list_ShopProducts));
                this.list_Products.forEach( product => {
                    product["ProductName"] = product.Bazaar_Product__r.Name;
                });
            } else {
                this.showToastMessage('ERROR: Fetching Shop Products', 'error', data.errorMessage);
            }
        } else if (error) {
            this.showToastMessage('ERROR: Fetching Shop Products', 'error', error.body.message);
        }
    }

//Handling the closing of the Modal Screen.
    handleCloseAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

//Handling Change on search Text Field
    handleSearchChange(event) {
        this.strSearchText = event.target.value;
    }

//Handling selected products 
    handleSelectedProduct(event) {
        this.blnShowProductsModal = true;
    }
//Handling DataTable selection of Rows
    handleDataTableClick(event) {
        var list_SelectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
        this.list_SelectedProducts = list_SelectedRecords;
    }
//Handling the Toast Message on Success/Error/Warning.
    showToastMessage(strTitle, strVariant, strMessage) {
        const event = new ShowToastEvent({
            title: strTitle,
            variant: strVariant,
            message: strMessage
        });
        this.dispatchEvent(event);
    }
}
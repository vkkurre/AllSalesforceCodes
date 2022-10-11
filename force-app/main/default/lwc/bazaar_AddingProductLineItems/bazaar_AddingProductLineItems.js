import { LightningElement, api, track } from 'lwc';
import addProductLineItem from '@salesforce/apex/Billing_ProductLineItem_Controller.addProductLineItem';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Bazaar_AddingProductLineItems extends LightningElement {
    @api blnSelectedProductsModal;
    @api list_allSelectedProducts;
    @track doubleTotalAmount = 0;
    @track blnCanSave = false;
    @api recordId;
    list_Products = [];
    
    handleCloseButton(event) {
        this.blnSelectedProductsModal = false;
    }

    handleChangeQuantity(event){
        let id = event.target.dataset.id;
        let quantity = event.target.value;
        let stock;
        let unitPrice;
        let totalPrice = 0;
        let totalAmount = 0;
        let allTotalPriceField = [...this.template.querySelectorAll(".totalPrice")];
        let quantityField = [...this.template.querySelectorAll(".quantity")].filter(element => element.dataset.id == id)[0];
        let listOfAllSelectedProducts = JSON.parse(JSON.stringify(this.list_allSelectedProducts));
        for (let objProduct of listOfAllSelectedProducts) { 
            if (objProduct["Id"] == id) {
                unitPrice = objProduct["Unit_Price__c"];
                stock = objProduct["Quantity__c"];
            }
        }
        this.blnCanSave = this.checkStockAvailable(quantityField, quantity, stock);
        if (this.blnCanSave) {
            totalPrice = quantity * unitPrice;
            allTotalPriceField.filter(element => element.dataset.id == id)[0].value = totalPrice;
            allTotalPriceField.forEach(element => {
                totalAmount += parseInt(element.value);
            });
            this.doubleTotalAmount = totalAmount;
        }
    }

    handleSaveButton(event) {
        if (this.blnCanSave) {
            let allQuantityFields = [...this.template.querySelectorAll(".quantity")];
            allQuantityFields.forEach(element => {
                let objProduct = {};
                objProduct.Billing__c = this.recordId;
                objProduct.Quantity__c = element.value;
                objProduct.Shop_Product__c = element.dataset.id;
                this.list_Products.push(objProduct);
            });

            console.log(this.list_Products);
            //Calling Apex Method
            addProductLineItem({
                objProductsWrapper : { list_Products : this.list_Products }
            }).then( result => {
                if (result.blnIsSuccess) {
                    this.showToastMessage("Success", 'success', "Added Products Successfully");
                    location.reload();
                    blnSelectedProductsModal = false;
                } else {
                    this.showToastMessage("Error", 'error', result.errorMessage);
                    blnSelectedProductsModal = false;
                }
            }).catch( error => {
                this.showToastMessage("Error", 'error', error.body.message);
                blnSelectedProductsModal = false;
            });
            this.list_Products = [];
        }
        
    }

    checkStockAvailable(quantityField, quantity, stock){
        if (quantity <= 0) {
            quantityField.setCustomValidity("Add quantity");
            quantityField.reportValidity();
            return false;
        } else if (quantity > stock) {
            quantityField.setCustomValidity("Only "+stock+" Available");
            quantityField.reportValidity();
            return false;
        } else {
            quantityField.setCustomValidity("");
            quantityField.reportValidity();
            return true;
        }
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
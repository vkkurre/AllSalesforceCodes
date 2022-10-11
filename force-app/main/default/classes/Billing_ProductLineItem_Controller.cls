public with sharing class Billing_ProductLineItem_Controller {

    public class ResponseHandler {
        @AuraEnabled
        public String errorMessage;
        @AuraEnabled
        public Boolean blnIsSuccess;
        @AuraEnabled
        public List<Shop_Product__c> list_ShopProducts;
        
        public ResponseHandler () {
            this.errorMessage = '';
            this.blnIsSuccess = true;
            this.list_ShopProducts = new List<Shop_Product__c>();
        }
    }

    public class ProductsWrapper {
        @AuraEnabled
        public List<Product_Line_Item__c> list_Products { get; set; }
    }

    @AuraEnabled
    public static ResponseHandler addProductLineItem(ProductsWrapper objProductsWrapper){
        ResponseHandler objResponsehandler = new ResponseHandler();
        List<Product_Line_Item__c> list_Products = new List<Product_Line_Item__c>();

        try {
            if (!objProductsWrapper.list_Products.isEmpty()) {
                list_Products = objProductsWrapper.list_Products;
                insert list_Products;
            }
        } catch (Exception objException) {
            objResponsehandler.blnIsSuccess = false;
            objResponsehandler.errorMessage = objException.getMessage();
        }

        return objResponsehandler;
    }

    @AuraEnabled(cacheable = true)
    public static ResponseHandler getProductList(Id idBillingId, String strSearchKey){
        ResponseHandler objResponseHandler = new responseHandler();
        String strSearchPattern = strSearchKey + '%';
        
        Billing__c objBilling = [SELECT Id, 
                                Shop_Name__c 
                                FROM Billing__c 
                                WHERE Id = :idBillingId];

        try {
            objResponseHandler.list_ShopProducts = [SELECT 
                                                    Id, 
                                                    Name, 
                                                    Bazaar_Product__r.Name, 
                                                    Account__r.Name, 
                                                    Unit_Price__c, 
                                                    Expiration_Date__c,
                                                    Quantity__c 
                                                    FROM Shop_Product__c
                                                    WHERE Account__c = :objBilling.Shop_Name__c
                                                    AND Bazaar_Product__r.Name LIKE :strSearchPattern];
        } catch (Exception objException) {
            objResponseHandler.blnIsSuccess = false;
            objResponseHandler.errorMessage = objException.getMessage();
            return objResponseHandler;
        }
        
        return objResponseHandler;
    }
}

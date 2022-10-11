public with sharing class searchHub {
    public searchHub() {

    }
    @AuraEnabled
    public static List<Bike__c> hubSearchBikes(String hub){
        String searchvalue=hub+'%';
        List<Bike__c> bikes=[SELECT Id, Name, VehicleNo__c, KMCovered__c, Hub__r.Name FROM Bike__c WHERE Hub__r.Name LIKE :searchValue AND IsBooked__c=false];
        return bikes;
    }
}

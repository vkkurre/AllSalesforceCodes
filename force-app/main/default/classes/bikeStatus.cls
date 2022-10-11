public with sharing class bikeStatus {
    public bikeStatus(){

    }
    @AuraEnabled(cacheable=true)
    public static List<Bike__c> inactiveBikes(Id hubid){
        List<Bike__c> inactiveBikes=[SELECT Id, Name, Active__c FROM Bike__c WHERE Hub__r.Id=:hubid];
        return inactiveBikes;
    }
    @AuraEnabled(cacheable=true)
    public static List<Bike__c> currentBookings(Id hubid){
        List<Bike__c> bookedBikes=[SELECT Id, Name, IsBooked__c FROM Bike__c WHERE Hub__r.Id=:hubid];
        return bookedBikes;
    }
    @AuraEnabled(cacheable=true)
    public static List<Bike__c> pendingMaintainence(Id hubid){
        List<Bike__c> serviceBikes=[SELECT Id, Name, DueToService__c FROM Bike__c WHERE Hub__r.Id=:hubid];
        return serviceBikes;
    }
}

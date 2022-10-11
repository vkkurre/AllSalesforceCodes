public with sharing class duesBoooking {
    public duesBoooking() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Booking__c> getUnpaidFare(Id contactid){
        List<Booking__c> bookings=[SELECT Id, Name, ActualFare__c FROM Booking__c 
        Where Customer__r.Id=:contactid AND Paid__c=false];
        return bookings;
    }
}

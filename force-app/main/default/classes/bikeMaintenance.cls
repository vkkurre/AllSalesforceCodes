public with sharing class bikeMaintenance {
    
    @AuraEnabled
    public static void addBikeMaintenance(Id i, String com){
        User user_maintenance=[SELECT Id, ProfileId FROM User WHERE Profile.Name='Maintanance'];
        Bike__c bike=[SELECT Id, Name FROM Bike__c WHERE Id=:i];
        bike.DueToService__c=true;
        update bike;
        actionTask.createTask(bike.Name, bike.Id, user_maintenance.Id, com);
    }
}

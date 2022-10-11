public with sharing class listContact {
    public listContact() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> contactsList=[SELECT Id, Name, Email, Phone, AccountId FROM Contact];
        return contactsList;
    }
}

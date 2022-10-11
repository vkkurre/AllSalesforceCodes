public with sharing class searchContacts {
    public searchContacts() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> search(String name){
        String likeValue='%'+name+'%';
        return [SELECT Id, Name FROM Contact WHERE Name LIKE:likeValue];
    }
}

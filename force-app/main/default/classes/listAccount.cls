public with sharing class listAccount {
    public listAccount() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        List<Account> accounts=[SELECT Id, Name, Phone, AnnualRevenue, Website, Type, Rating FROM Account ORDER BY LastModifiedDate DESC LIMIT 5];
        return accounts;
    }
}

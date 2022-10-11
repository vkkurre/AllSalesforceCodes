public with sharing class searchOppAmountClass {
    public searchOppAmountClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> searchOppAmount(String amount){
        try {
            Double amt=Double.valueOf(amount);
            return [SELECT Id, Amount, Name FROM Opportunity WHERE Amount=:amt];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}

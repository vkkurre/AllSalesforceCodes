public with sharing class CaseCommentController {
    @AuraEnabled
    public static void addCaseComment(Id caseid,String comment){
        Case_Comment__c caseCommentRec=new Case_Comment__c(Case__c=caseid, Comment_Body__c=comment);
        insert caseCommentRec;
    }
    @AuraEnabled(cacheable=true)
    public static List<Case_Comment__c> getAllCaseComments(Id caseid){
        List<Case_Comment__c> caseComments=[SELECT Id, Name,CreatedById, CreatedBy.Name,CreatedBy.SmallPhotoUrl,CreatedBy.FullPhotoUrl, Comment_Body__c, CreatedDate, LastModifiedDate FROM Case_Comment__c WHERE Case__c =:caseid ORDER BY LastModifiedDate DESC];
        return caseComments;
    }
    @AuraEnabled
    public static void deleteCaseComment(Id commid){
        Case_Comment__c cc=[SELECT Id FROM Case_Comment__c WHERE Id=:commid];
        delete cc;
    }
    @AuraEnabled
    public static void updateCaseComment(Id commid,String comment){
        Case_Comment__c caseCommentRec=[SELECT Id, Comment_Body__c FROM Case_Comment__c WHERE Id=:commid];
        caseCommentRec.Comment_Body__c=comment;
        update caseCommentRec;
    }
}

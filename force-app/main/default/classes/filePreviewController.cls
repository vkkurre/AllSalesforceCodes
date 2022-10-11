public with sharing class filePreviewController {
    static long kilo = 1024;
    static long mega = kilo * kilo;
    static long giga = mega * kilo;
    static long tera = giga * kilo;

    @AuraEnabled(cacheable=true)
    public static Map<Id,List<String>> getRelatedFilesByRecId(Id ridg){
        Map<Id,List<String>> result=new Map<Id,List<String>>();
        List<Contact> cons=[SELECT Id, Name FROM Contact WHERE AccountId= :ridg];
        List<Id> consIds=new List<Id>();
        if(cons.size()>0){
        for(Contact c:cons){
            consIds.add(c.Id);
        }
        }
        List<Id> fileIds=new List<Id>();
        List<ContentDocumentLink> docslist=[SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId= :ridg];
        List<ContentDocumentLink> relatedDocslist=[SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId IN :consIds];
        if(docslist.size()>0){
        for(ContentDocumentLink cd: docslist){
            fileIds.add(cd.ContentDocumentId);
        }
        }
        if(relatedDocslist.size()>0){
        for(ContentDocumentLink cd: relatedDocslist){
            fileIds.add(cd.ContentDocumentId);
        }
        }
        List<ContentVersion> docs=[SELECT ContentDocumentId,Id, FileExtension, Title, ContentSize, CreatedDate, FileType,ContentBodyId FROM ContentVersion WHERE ContentDocumentId IN : fileIDs ORDER BY Title];
        for(ContentVersion cv:docs){
            List<String> info=new List<String>();
            String vid=String.valueOf(cv.Id);
            String rvid=vid.substring(0, vid.length()-3);
            String cid=String.valueOf(cv.ContentBodyId);
            String rcid=cid.substring(0,cid.length()-3);
            info.add(cv.Title);
            info.add(cv.FileType);
            
            info.add(cv.FileExtension);
            info.add(filePreviewController.getConvertedFromBytes(cv.ContentSize));
            info.add(cv.CreatedDate.formatGMT('MMM d, yyyy'));
            if(cv.FileType=='WORD'){
                info.add(null);
            }
            else if(cv.FileType=='EXCEL_X'){
                info.add(null);
            }
            else{
                info.add('/sfc/servlet.shepherd/version/renditionDownload?rendition=thumb120by90&versionId='+rvid+'&operationContext=CHATTER&contentId='+rcid+'&page=0');
            }
        result.put(cv.ContentDocumentId, info);
        }
        return result;
    }
    public static String getConvertedFromBytes(Integer size_in_bytes){
        String s = '';
        double kb = (double)size_in_bytes / kilo;
        double mb = kb / kilo;
        double gb = mb / kilo;
        double tb = gb / kilo;
        if(size_in_bytes < kilo) {
            s = size_in_bytes + 'B';
        } else if(size_in_bytes >= kilo && size_in_bytes < mega) {
            s =  Decimal.valueOf(kb).setScale(0) + 'KB';
        } else if(size_in_bytes >= mega && size_in_bytes < giga) {
            s = Decimal.valueOf(mb).setScale(0) + 'MB';
        } else if(size_in_bytes >= giga && size_in_bytes < tera) {
            s = Decimal.valueOf(gb).setScale(0) + 'GB';
        } else if(size_in_bytes >= tera) {
            s = Decimal.valueOf(tb).setScale(0) + 'TB';
        }
        return s;
    }
}

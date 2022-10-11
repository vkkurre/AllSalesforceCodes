public with sharing class relatedObject {
    @AuraEnabled(cacheable=true)
    public static Map<String, List<String>> getAllRelatedObjects(Id rid){
        Schema.SObjectType s_object = rid.getSObjectType();
        Map<String, List<String>> objs=new Map<String, List<String>>();
        Set<Schema.SObjectType> Objectnames=new Set<Schema.SObjectType>();
        for(Schema.SobjectField strFld: s_object.getDescribe().fields.getMap().Values()){
        if(strFld.getDescribe().getType() == Schema.DisplayType.REFERENCE){
        List<Schema.SObjectType> objname=new List<Schema.SObjectType>();
            objname=strFld.getDescribe().getReferenceTo();
            Objectnames.add(objname[0]);
        } 
        }
        Schema.DescribeSObjectResult R = s_object.getDescribe();
        for (Schema.ChildRelationship cr: R.getChildRelationships()){
        Objectnames.add(cr.getChildSObject());
        }
    if(s_object.getDescribe().getName()=='Opportunity'){
        for(Schema.SObjectType s:Objectnames){
            if(String.valueOf(s)=='CombinedAttachment' || String.valueOf(s)=='AttachedContentNote'){
        for(Schema.SObjectField strFld: s.getDescribe().fields.getMap().Values()){
            Schema.SObjectField field=null;
            if(strFld.getDescribe().getType() == Schema.DisplayType.REFERENCE){
                List<Schema.SObjectType> objname=new List<Schema.SObjectType>();
                objname=strFld.getDescribe().getReferenceTo();
                List<String> objsStr=new List<String>();
                for(Schema.SObjectType h:objname){
                    objsStr.add(String.valueOf(h));
                }
                if(objsStr.contains('Opportunity')){
                    field=strFld;
                    String link='/lightning/r/Opportunity/'+rid+'/related/'+s+'s/view';
                    //String sQuery = 'Select Id FROM ' + s +' WHERE '+field+'='+'0065g00000EamxLAAR';
                    List<String> info=new List<String>();
                    info.add(link);
                    if(String.valueOf(s)=='CombinedAttachment'){
                        objs.put('Customer RFQ',info);
                    }
                    else if(String.valueOf(s)=='AttachedContentNote'){
                        objs.put('Competitor Info',info);
                    }
                    else{
                    objs.put(String.valueOf(s),info);
                    }
                }
            }
        }
       	}
        }
    }
    else if(s_object.getDescribe().getName()=='Quote'){
        for(Schema.SObjectType s:Objectnames){
            if(String.valueOf(s)=='AttachedContentDocument'){
        for(Schema.SObjectField strFld: s.getDescribe().fields.getMap().Values()){
            Schema.SObjectField field=null;
            if(strFld.getDescribe().getType() == Schema.DisplayType.REFERENCE){
                List<Schema.SObjectType> objname=new List<Schema.SObjectType>();
                objname=strFld.getDescribe().getReferenceTo();
                List<String> objsStr=new List<String>();
                for(Schema.SObjectType h:objname){
                    objsStr.add(String.valueOf(h));
                }
                if(objsStr.contains('Quote')){
                    field=strFld;
                    String link='/lightning/r/Quote/'+rid+'/related/'+s+'s/view';
                    //String sQuery = 'Select Id FROM ' + s +' WHERE '+field+'='+'0065g00000EamxLAAR';
                    List<String> info=new List<String>();
                    info.add(link);
                    if(String.valueOf(s)=='AttachedContentDocument'){
                        objs.put('Principal Data',info);
                    }
                    else{
                    objs.put(String.valueOf(s),info);
                    }
                }
            }
        }
       	}
        }
    }
    else{
        for(Schema.SObjectType s:Objectnames){
        for(Schema.SObjectField strFld: s.getDescribe().fields.getMap().Values()){
            Schema.SObjectField field=null;
            if(strFld.getDescribe().getType() == Schema.DisplayType.REFERENCE){
                List<Schema.SObjectType> objname=new List<Schema.SObjectType>();
                objname=strFld.getDescribe().getReferenceTo();
                List<String> objsStr=new List<String>();
                for(Schema.SObjectType h:objname){
                    objsStr.add(String.valueOf(h));
                }
                if(objsStr.contains(String.valueOf(s_object))){
                    field=strFld;
                    String link='/lightning/r/'+String.valueOf(s_object)+'/'+rid+'/related/'+s+'s/view';
                    //String sQuery = 'Select Id FROM ' + s +' WHERE '+field+'='+'0065g00000EamxLAAR';
                    List<String> info=new List<String>();
                    info.add(link);
                    objs.put(String.valueOf(s),info);
                }
            }
        }
        }
    }
    return objs;
    }
}

import { LightningElement, track} from 'lwc';

export default class Todo extends LightningElement {
    tName;
    validity=true;
    @track taskList=[];
    @track doneTask=[];
    showList=false;
    doneList=false;
    i=0;
    handleChange(event){
        if(event.target.name=="taskName"){
            this.tName=event.detail.value;
        }
    }
    isValid(){
        let taskField=this.template.querySelector(".task");
        let taskFieldValue=taskField.value;
        if(taskFieldValue===""){
            taskField.setCustomValidity("Task Name is Required");
            validity=false;
        }else{
            taskField.setCustomValidity("");
            var stat=this.taskList.map(function(e) {
                return e.taskname;
            }).includes(taskFieldValue);
            console.log(stat);
            if(stat){
                taskField.setCustomValidity("Task Already Exists");
                validity=false;
            }
            else{
                taskField.setCustomValidity("");
                this.validity=true;
            }
            taskField.reportValidity();
        }
        taskField.reportValidity();
    }
    handleSubmit(event){
        this.isValid();
        if(this.validity){
            this.i=this.i+1;
            this.taskList.push({Id:this.i,taskname:this.tName});
            console.log(this.taskList);
            if(this.taskList.length<1)
                this.showList=false;
            else
                this.showList=true;

            this.template.querySelector('.task').value=null;
        }
    }
    handleDoneTask(event){
        //for simple array list use: var index=this.taskList.indexOf(event.target.value);
        //for array of objects use the following
        var pos = this.taskList.map(function(e) {
            return e.taskname;
        }).indexOf(event.target.value);
        this.doneTask.push(this.taskList[pos]);
        this.taskList.splice(pos,1);
        if(this.taskList.length<1)
            this.showList=false;
        else
            this.showList=true
        if(this.doneTask.length<1)
            this.doneList=false;
        else
            this.doneList=true;
    }
}
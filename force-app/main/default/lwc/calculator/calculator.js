import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {
    num1;
    num2;
    res=0;sno=0;
    @track results=[];
    
    handleClickAdd(event){
        console.log(event.target.label);
        this.sno=this.sno+1;
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="firstNum"){
                this.num1=parseInt(element.value);
            }
            else if(element.name=="secondNum"){
                this.num2=parseInt(element.value);
            }
        },this);
        this.res=this.num1+this.num2;
        this.results.push({Id:this.sno,fNum:this.num1,sNum:this.num2,operator:"+",result:this.res});
    }
    handleClickSub(event){
        console.log(event.target.label);
        this.sno=this.sno+1;
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="firstNum"){
                this.num1=parseInt(element.value);
            }
            else if(element.name=="secondNum"){
                this.num2=parseInt(element.value);
            }
        },this);
        this.res=this.num1-this.num2;
        this.results.push({Id:this.sno,fNum:this.num1,sNum:this.num2,operator:"-",result:this.res});
    }
    handleClickMul(event){
        console.log(event.target.label);
        this.sno=this.sno+1;
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="firstNum"){
                this.num1=parseInt(element.value);
            }
            else if(element.name=="secondNum"){
                this.num2=parseInt(element.value);
            }
        },this);
        this.res=this.num1*this.num2;
        this.results.push({Id:this.sno,fNum:this.num1,sNum:this.num2,operator:"*",result:this.res});
    }
    handleClickDiv(event){
        console.log(event.target.label);
        this.sno=this.sno+1;
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="firstNum"){
                this.num1=parseInt(element.value);
            }
            else if(element.name=="secondNum"){
                this.num2=parseInt(element.value);
            }
        },this);
        this.res=this.num1/this.num2;
        this.results.push({Id:this.sno,fNum:this.num1,sNum:this.num2,operator:"/",result:this.res});
    }
    handleClickClear(event){
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(field){
            field.reset();
        },this);
        this.results=[];
    }
}
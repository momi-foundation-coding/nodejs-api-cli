"use strict";/**
 * Contains methods for linked list
 * -> if there is any feature/function you need 
 * -> it is save to extend from this unless 
 * -> adding new common features such as pop, isEmpty etc
 */const Node=require("./node");class LinkedList{constructor(){this.head=null,this.tail=null}// if modified it will lead to errors
append(a){let b=new Node(a);this.head?(this.tail.next=b,this.tail=b):(this.head=b,this.tail=b)}// if modified -> it might lead to errors
addAll(a){// catch items passed that are not of type array
Array.isArray(a)&&a.forEach(a=>{this.append(a)})}}module.exports=LinkedList;
import React from "react";
import { Badge   } from "react-bootstrap";
 
const SingleCard = props => {

const { MyCard,index } = props;
let splitCard = MyCard.toString().split('-');
let section = splitCard[0];
var bgColor= "primary";
var txt= "dark";
if(section==="S"){
    bgColor= "dark";
    txt= "light";
    
}else if(section==="T"){
    bgColor= "dark";
    txt= "light";
}else if(section==="H"){
    bgColor= "danger";
    txt= "light";
}else if(section==="D"){
    bgColor= "warning";
    txt= "light";
}else if(section==="C"){
    bgColor= "success";
    txt= "light";
}
 return (
    <Badge  pill bg={bgColor} text={txt}  key={index}>{MyCard}</Badge>
 );
};
 
export default SingleCard;
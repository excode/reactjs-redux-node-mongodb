import React from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
    AddInvite,
    deleteInvite
  } from "../slices/invite";
const Company = (props) => {
  const {
    name,
    rating,
    address,
    postcode,
    state
  } = props.data;
const dispatch = useDispatch();  
const shiftId =props.shiftId;
const inviteId =props.inviteId;
const add2Invitee=()=>{
    //console.log(shiftId);
    dispatch(AddInvite({userId:'kazad79@gmail.com',shiftId:shiftId})) 
  };

  const declineInvitation=()=>{
  
    dispatch(deleteInvite(inviteId)) 
  };
const isInvited =props.isInvited;

  return (
 
  
    <div class="card full shadow-sm pl-0 ml-0">
      <div class="card-body">
      <div class="row">
        <div class="col-lg-7">
        <h5 class="card-title">{name}</h5>
        <ReactStars
        count={5}
        size={20}
        value={rating}
        activeColor="#ffd700"
    />
        <p class="card-text">{address}<br/>
        {postcode}  {state}
        </p>
        </div>
       
        <div class="col-lg-5  flex-grow-1  text-center">
        <p>&nbsp;</p>
        <p>
            {!isInvited ? (
                <>
                
         <a href="#" class="btn btn-info mx-2" onClick={add2Invitee}>Invite+(TEST)</a>
         <a href="#" class="btn btn-custom mx-2">Apply</a>
         </>
            ):(
        <>
        <a href="#" class="btn btn-danger mx-2" onClick={declineInvitation}>Decline</a>
        <a href="#" class="btn btn-custom mx-2">Apply</a>
        </>
            )}
         
         </p>
        </div>
      </div>
      </div>
    </div>
    

  );
};

export default Company;




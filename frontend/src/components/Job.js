import React from "react";
import moment from 'moment'
import Company from "./Company";
const Job = (props) => {
  const {
    date,
    startTime,
    endTime,
    rate,
    rating,
    insertTime,
    companyId,
    department,
    details

  } = props.data;
  
  let dateFormat = moment(date).format('ddd Do MMM');
  let start = moment(startTime).format('h:mm a');
  let end = moment(endTime).format('h:mm a');
  let isInvited = props.isInvited==undefined?false: props.isInvited;

  let shiftId= props.shiftId;
  let inviteId= props.inviteId==undefined?'':props.inviteId;
  
  return (
 
   <div class="row py-3 px-2">
       <div class="col-lg-4 d-flex align-items-stretch pr-0 mr-0">
      {isInvited?(
      <div class="light_round" />
      ):(
      <div class="drak_round" />
      )
    }
    <div class="card full1 shadow-sm ">
     
      <div class="card-body">
        <h5 class="title">{dateFormat}</h5>
        <span>{start} - {end}</span><br/>
        <span>{department}</span>
        <h2>${rate} / hr</h2>
       
      </div>
    </div>
  </div>
  <div class="col-lg-8 d-flex align-items-stretch pl-0 ml-0">
   <Company data={companyId} isInvited={isInvited} shiftId={shiftId} inviteId={inviteId} />
    
  </div>

      </div>
    
  );
};

export default Job;




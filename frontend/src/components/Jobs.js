import React, { useEffect, useState } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoading, selectPageNo, selectPerpage, selectShifts, selectTotal } from "../slices/shift";
import { selectInviteLoading,selectInvites } from "../slices/invite";
import ReactPaginate from 'react-paginate';
import {
  fetchShift,
  updateShift,
  deleteShift,
} from "../slices/shift";
import {
  fetchInvite,
} from "../slices/invite";

const Jobs = () => {

const dispatch = useDispatch();
const entities = useSelector(selectShifts);
const curPage = useSelector(selectPageNo);
const perpage = useSelector(selectPerpage);
const total = useSelector(selectTotal);
const loading = useSelector(selectLoading);
const totalPages = Math.ceil(total /perpage);
// INVITE LIST
const inviteEntities = useSelector(selectInvites);
const inviteLoading = useSelector(selectInviteLoading);

  useEffect(() => {
   dispatch(fetchShift())
   dispatch(fetchInvite())
  },[]);

 
 
  const chagePage=(e)=>{
    console.log(e)
   if(!e.isActive){
     let page=e.nextSelectedPage;
     console.log('current_pa',page)
     dispatch(fetchShift({page:page}))
   }
   
    
  };
  return (
    <div class="container">
   <h1>Shifts</h1>
   <span>Your have been invited</span>
    { inviteLoading  ? (
    <h2>Loading .....</h2>
    ):(
    <div class="panel">
      
      {inviteEntities && inviteEntities.map((d) => {
        return <Job data={d.shiftId} key={d._id} inviteId={d._id} isInvited={true} />
      })}
    </div>
    )}
    { loading == true ? (
      <h2>Loading .....</h2>
    ):(
    <div class="panel">
      <ReactPaginate
       className="pagination justify-content-center"
       pageClassName="page-item"
       pageLinkClassName="page-link"
       previousClassName ="page-link"
       nextClassName="page-link"
        breakLabel="..."
        nextLabel=" >"
        onClick={(e)=>(chagePage(e))}
        pageRangeDisplayed={10}
        pageCount={totalPages}
        initialPage={curPage}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
      {entities && entities.map((d) => {
        return <Job data={d} key={d._id}  shiftId={d._id} />
      })}
    </div>
    )}
    </div>
  );
};

export default Jobs;

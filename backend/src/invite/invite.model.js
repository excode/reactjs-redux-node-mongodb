const mongoose = require('../../common/services/mongoose.service').mongoose;
const ShiftModel = require('../shift/shift.model');
var ObjectId = require('mongodb').ObjectId; 
const Schema = mongoose.Schema;
  
  const inviteSchema = new Schema({
      	userId : { type: String, required: [true, 'userId_required']},
        shiftId : {type: Schema.Types.ObjectId, ref: 'Shift'} ,
        enterBy:{ type: String, required: [true, 'enterBy_required']},
        insertTime : {type:Number,default:0}
  });
  
  inviteSchema.virtual('id').get(function () {
      return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialised.
  inviteSchema.set('toJSON', {
      virtuals: true
  });
  
  inviteSchema.findById = function (cb) {
      return this.model('Invite').find({id: this.id}, cb);
  };
  
  const Invite = mongoose.model('Invite', inviteSchema);
  
  /*
  exports.findByEmail = (email) => {
      return Invite.find({email: email});
  };
  */
  exports.findById = (id) => {
      return Invite.findById(id)
          .then((result) => {
              result = result.toJSON();
              delete result._id;
              delete result.__v;
              return result;
          });
  };
  
  exports.createInvite = (inviteData) => {
      const invite = new Invite(inviteData);
      return invite.save();
  };
  
  exports.list = (perPage, page , query ) => {
        const _query={};//{_id:query.id}; 
        let sortBy='insertTime'
        let sortDirection=1
        let currentYear =new Date().getFullYear() ;
        let oneRow=false;
        if(query.userId){
        _query['userId'] = query.userId;
        }
        
        if(query._id){
            _query['_id'] = ObjectId(query._id);
            oneRow= true; 
            }
       
        if(query.shiftId){
        _query['shiftId'] = query.shiftId;
        }
                       
        if(query.insertTime){
        let insertTimeAry = query.insertTime.split("-");
        if(insertTimeAry.length==1){
            _query['insertTime'] =  query.insertTime ;
        }
        //RANGE SEARCH // VALUE   123-500 IT WILL SEARCH BETWEEN 123 and 500
     
        if(insertTimeAry.length==2 && insertTimeAry[0] && insertTimeAry[1]){
            _query['insertTime'] = { $gte: insertTimeAry[0], $lte: insertTimeAry[1]} ;
        }
            
    }
                           
        if(query.sortBy){
            sortBy = query.sortBy;
        }
        if(query.sortDirection){
            sortDirection = query.sortDirection;
        }
        return new Promise((resolve, reject) => {
        Invite.find(_query)
            .populate({path:'shiftId',populate:{path:'companyId'}} )
            .limit(perPage)
            .sort({sortBy : sortDirection})
            .skip(perPage * page)
            .exec(function (err, invite) {
                  if (err) {
                      reject(err);
                  } else {
                      if(oneRow){
                        resolve(invite);
                      }else{
                      Invite.countDocuments(_query).exec().then((total)=>{
                        const promises = { docs: invite , count: total ,perpage:perPage,page:page };

                        resolve(promises);
                    
                    }).catch((err2)=>{
                        reject(err2);
                    })
                }
                  }
              })
      });
  };

  exports.patchInvite = (id, inviteData) => {
      return new Promise((resolve, reject) => {
        Invite.findById(id, function (err, invite) {
              if (err) reject(err);
              for (let i in inviteData) {
                invite[i] = inviteData[i];
              }
              invite.save(function (err, updatedInvite) {
                  if (err) return reject(err);
                  resolve(updatedInvite);
              });
          });
      })
  
  };
  
  exports.removeById = (inviteId) => {
      return new Promise((resolve, reject) => {
        Invite.remove({_id: inviteId}, (err) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(err);
              }
          });
      });
  };
  
  

  
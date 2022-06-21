const mongoose = require('../../common/services/mongoose.service').mongoose;
const funcs =  require("../../common/functions/funcs");
const Schema = mongoose.Schema;
  
  const shiftSchema = new Schema({
      	companyId :  {type: Schema.Types.ObjectId, ref: 'Company'},
	date : {type:Date},
	startTime : {type:Number,default:0},
	endTime : {type:Number,default:0},
	department : { type: String, required: [true, 'department_required']},
	details : { type: String, required: [true, 'details_required']},
	rate : {type:Number,default:0},
	
	status : {type:Number,default:0},
	enterBy : { type: String, required: [true, 'enterBy_required']},
	insertTime : {type:Number,default:0},
	updateTime : {type:Number,default:0}
  });
  
  shiftSchema.virtual('id').get(function () {
      return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialised.
  shiftSchema.set('toJSON', {
      virtuals: true
  });
  
  shiftSchema.findById = function (cb) {
      return this.model('Shift').find({id: this.id}, cb);
  };
  
  const Shift = mongoose.model('Shift', shiftSchema);
  
  /*
  exports.findByEmail = (email) => {
      return Shift.find({email: email});
  };
  */
  exports.findById = (id) => {
      return Shift.findById(id)
          .then((result) => {
              result = result.toJSON();
              delete result._id;
              delete result.__v;
              return result;
          });
  };
  
  exports.createShift = (shiftData) => {
      const shift = new Shift(shiftData);
      return shift.save();
  };
  
  exports.list = (perPage, page , query ) => {
        const _query={};//{_id:query.id}; 
        let sortBy='date'
        let sortDirection= 1
        let currentYear =new Date().getFullYear() ;

        if(query.companyId){
        _query['companyId'] = query.companyId;
        }
                       

                    

                    

        if(query.department){
        _query['department'] = new RegExp(query.department,'i');
        }
                

        if(query.details){
        _query['details'] = new RegExp(query.details,'i');
        }
            

            
        

        if(query.status){
            _query['status'] =  query.status ;
        }
                
                           

        if(query.enterBy){
        _query['enterBy'] = new RegExp(query.enterBy,'i');
        }
                       
        if(query.insertTime){
        let insertTimeAry = query.insertTime.split("-");
        if(insertTimeAry.length==1){
            _query['insertTime'] =  query.insertTime ;
        }
        //RANGE SEARCH // VALUE ins  123-500 IT WILL SEARC BETWEEN 123 and 500
        
        if(insertTimeAry.length==2 && insertTimeAry[0] && insertTimeAry[1]){
            _query['insertTime'] = { $gte: insertTimeAry[0], $lte: insertTimeAry[1]} ;
        }
    }
    if(query.updateTime) {
        let updateTimeAry = query.updateTime.split("-");
        if(updateTimeAry==1){
            _query['updateTime'] =  query.updateTime ;
        }
            //RANGE SEARCH
        
        if(updateTimeAry.length==2 && updateTimeAry[0] && updateTimeAry[1]){
            _query['updateTime'] = { $gte: updateTimeAry[0] , $lte: updateTimeAry[1]} ;
        }
    }                    
        if(query.sortBy){
            sortBy = query.sortBy;
        }
        if(query.sortDirection){
            sortDirection = query.sortDirection;
        }
        return new Promise((resolve, reject) => {
        Shift.find(_query)
            .populate({path:'companyId'} )
            .limit(perPage)
            .sort({date : -1})
            .skip(perPage * page)
            .exec(function (err, shift) {
                  if (err) {
                      reject(err);
                  } else {
                      Shift.countDocuments(_query).exec().then((total)=>{
                        const promises = { docs: shift , count: total ,perpage:perPage,page:page };
                        resolve(promises);
                    }).catch((err2)=>{
                        reject(err2);
                    })
                  }
              })
      });
  };
 
  exports.patchShift = (id, shiftData) => {
      return new Promise((resolve, reject) => {
        Shift.findById(id, function (err, shift) {
              if (err) reject(err);
              for (let i in shiftData) {
                shift[i] = shiftData[i];
              }
              shift.save(function (err, updatedShift) {
                  if (err) return reject(err);
                  resolve(updatedShift);
              });
          });
      })
  
  };
  
  exports.removeById = (shiftId) => {
      return new Promise((resolve, reject) => {
        Shift.remove({_id: shiftId}, (err) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(err);
              }
          });
      });
  };
  

  exports.dumpdata=()=>{
      let now = funcs.getNowUTC();
      let dumps=[];
      let company=[
          '62b15552773df612cbff80de',
          '62b1557e773df612cbff80e0',
          '62b15590773df612cbff80e2',
          '62b155b6773df612cbff80e4',
          '62b155ea773df612cbff80e6',
          '62b15707773df612cbff80e8'

      ]
    let  times=[0,6,8,12,14,16];

    let depart=['Child Care','Intensive Care','Labour Ward','Caridiac','General'];
    
    
    var from = new Date(2022,5,1);
    var to = new Date(2022,6,30);
    

        for (var day1 = from; day1 <= to; day1.setDate(day1.getDate() + 1)) {
            
               let day=day1;
                 
               let dateStr =new Date(day.getFullYear(),day.getMonth(),day.getDate());
                let ddd = new Date(dateStr);
                 // console.log(ddd);
                  for(let j =0;j<depart.length;j++){
                    let dep_name= depart[j]
                    for(let k =0;k<company.length;k++){
                      //  for(let i =0;i<times.length;i++){
                        let t= times[Math.floor(Math.random() * times.length)];
                        let  startTime = Date.UTC(day.getFullYear(),day.getMonth(),day.getDate(),t,0,0);
                        let  endTime = Date.UTC(day.getFullYear(),day.getMonth(),day.getDate(),t+ 8,0,0);
                        let comp= company[k]

                        let data={
                            
                                companyId :  comp,
                          date : ddd,
                         
                          startTime : startTime,
                          endTime : endTime,
                          department :dep_name,
                          details : 'TEST DETAILS',
                          rate : getRandomArbitrary(25,60),
                          
                          status : 1,
                          enterBy : 'admin',
                          insertTime : now,
                          updateTime : 0
                        }
                       // console.log(dumps);
                        dumps.push(data)
                    //}

                  }

            }
           

        }
       
      
        return new Promise((resolve, reject) => {
        Shift.insertMany(dumps).then(function(){
            resolve("Data inserted")  // Success
        }).catch(function(error){
            reject(error)      // Failure
        });
       
    });
    
  }
  

  function getRandomArbitrary(min, max) {
    let num= Math.random() * (max - min) + min;
    return Math.round(num * 100) / 100
  }
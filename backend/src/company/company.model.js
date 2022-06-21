const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
  
  const companySchema = new Schema({
      	name : { type: String, required: [true, 'name_required']},
        contactNumber : { type: String, required: [true, 'contactNumber_required']},
        email : { type: String, required: [true, 'email_required']},
        address : { type: String, required: [true, 'address_required']},
        postcode : { type: String, required: [true, 'postcode_required']},
        state : { type: String, required: [true, 'state_required']},
        rating : {type:Number,default:0},
        status : {type:Number,default:0},
        enterBy : { type: String, required: [true, 'enterBy_required']},
        insertTime : {type:Number,default:0},
        updateTime : {type:Number,default:0}
  });
  
  companySchema.virtual('id').get(function () {
      return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialised.
  companySchema.set('toJSON', {
      virtuals: true
  });
  
  companySchema.findById = function (cb) {
      return this.model('Company').find({id: this.id}, cb);
  };
  
  const Company = mongoose.model('Company', companySchema);
  
  /*
  exports.findByEmail = (email) => {
      return Company.find({email: email});
  };
  */
  exports.findById = (id) => {
      return Company.findById(id)
          .then((result) => {
              if(result){
              result = result.toJSON();
              delete result._id;
              delete result.__v;
              return result;
              }else{
                return {}
              }
          });
  };
  
  exports.createCompany = (companyData) => {
      const company = new Company(companyData);
      return company.save();
  };
  
  exports.list = (perPage, page , query ) => {
        const _query={};//{_id:query.id}; 
        let sortBy='insertTime'
        let sortDirection=1
        let currentYear =new Date().getFullYear() ;
         
        if(query.name){
        _query['name'] = new RegExp(query.name,'i');
        }
            

        if(query.contactNumber){
        _query['contactNumber'] = new RegExp(query.contactNumber,'i');
        }
            

        if(query.email){
        _query['email'] = new RegExp(query.email,'i');
        }
            

        if(query.address){
        _query['address'] = new RegExp(query.address,'i');
        }
            

        if(query.postcode){
        _query['postcode'] = new RegExp(query.postcode,'i');
        }
                       

        if(query.status){
            _query['status'] =  query.status ;
        }
                      

        if(query.enterBy){
        _query['enterBy'] = new RegExp(query.enterBy,'i');
        }
        if(query.insertTime) {              
        let insertTimeAry = query.insertTime.split("-");
        if(insertTimeAry.length==1){
            _query['insertTime'] =  query.insertTime ;
        }
        //RANGE SEARCH // VALUE ins  123-500 IT WILL SEARC BETWEEN 123 and 500
     
        if(insertTimeAry.length==2 && insertTimeAry[0] && insertTimeAry[1]){
            _query['insertTime'] = { $gte: insertTimeAry[0], $lte: insertTimeAry[1]} ;
        }
    }
    if(query.insertTime) {    
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
        Company.find(_query)
            .limit(perPage)
            .sort({sortBy : sortDirection})
            .skip(perPage * page)
            .exec(function (err, company) {
                  if (err) {
                      reject(err);
                  } else {
                      Company.countDocuments(_query).exec().then((total)=>{
                        const promises = { docs: company , count: total ,perpage:perPage,page:page };
                        resolve(promises);
                    }).catch((err2)=>{
                        reject(err2);
                    })
                  }
              })
      });
  };
  exports.listSync = (query ) => {
  
    return new Promise((resolve, reject) => {
        Company.find(query)
            .exec(function (err, company) {
                if (err) {
                    reject(err);
                } else {
                    resolve(company);
                }
            })
    });
};
  exports.patchCompany = (id, companyData) => {
      return new Promise((resolve, reject) => {
        Company.findById(id, function (err, company) {
              if (err) reject(err);
              for (let i in companyData) {
            
                company[i] = companyData[i];

                 
              }
              
              company.save(function (err, updatedCompany) {
                  if (err) return reject(err);
                  resolve(updatedCompany);
              });
              
          });
      })
  
  };
  
  exports.removeById = (companyId) => {
      return new Promise((resolve, reject) => {
        Company.remove({_id: companyId}, (err) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(err);
              }
          });
      });
  };
  
  

  
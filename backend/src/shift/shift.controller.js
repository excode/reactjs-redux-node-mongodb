const ShiftModel = require('./shift.model');
const funcs =  require("../../common/functions/funcs");
exports.insert = (req, res) => {
    req.body.insertTime = funcs.getNowUTC(); // ALWAYRS CURRENT SYSTEM TIMESTAMP;
    req.body.enterBy ='admin' ; // IN REAL App it will grab the data from auth token;
          ShiftModel.createShift(req.body)
                .then((result) => {
                    
                  
                        res.status(201).send({id: result._id});
                  
                    
                }).catch((err)=>{
                    mes=funcs.handleValidationError(err);
                    res.status(400).json( mes );
                });
           
   
};

exports.list = (req, res ) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ShiftModel.list(limit, page,req.query)
        .then((result) => {
            res.status(200).send(result);
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });
};

exports.getById = (req, res) => {
  ShiftModel.findById(req.params.shiftId)
        .then((result) => {
            res.status(200).send(result);
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });
};
exports.patchById = (req, res) => {
    req.body.updateTime = funcs.getNowUTC(); // ALWAYRS CURRENT SYSTEM TIMESTAMP;
    ShiftModel.patchShift(req.params.shiftId, req.body)
        .then((result) => {
            res.status(200).send(result);
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });

};

exports.removeById = (req, res) => {
  ShiftModel.removeById(req.params.shiftId)
        .then((result)=>{
            res.status(204).send({});
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });
};
  
exports.dumptest = (req, res) => {
    ShiftModel.dumpdata()
          .then((result)=>{
              res.status(204).send({});
          }).catch((err)=>{
              mes=funcs.handleValidationError(err);
              res.status(400).json( mes );
          });
  };
    
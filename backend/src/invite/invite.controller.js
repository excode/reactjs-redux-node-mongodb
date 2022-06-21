const InviteModel = require('./invite.model'); 
const funcs =  require("../../common/functions/funcs");
exports.insert = (req, res) => {
        req.body.insertTime = funcs.getNowUTC(); // ALWAYRS CURRENT SYSTEM TIMESTAMP;
        req.body.enterBy ='admin' ; // IN REAL App it will grab the data from auth token;
          InviteModel.createInvite(req.body)
                .then((result) => {
                    
                        InviteModel.list(0,0,{_id:result._id}).then((rr)=>{
                            res.status(200).send(rr[0]);
                        })
                        
                  
                    
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
    InviteModel.list(limit, page,req.query)
        .then((result) => {
            res.status(200).send(result);
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });
};

exports.getById = (req, res) => {
  InviteModel.findById(req.params.inviteId)
        .then((result) => {
            res.status(200).send(result);
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });
};
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    InviteModel.patchInvite(req.params.inviteId, req.body)
        .then((result) => {
            res.status(204).send({});
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });

};

exports.removeById = (req, res) => {
  InviteModel.removeById(req.params.inviteId)
        .then((result)=>{
            res.status(204).send({});
        }).catch((err)=>{
            mes=funcs.handleValidationError(err);
            res.status(400).json( mes );
        });
};
  
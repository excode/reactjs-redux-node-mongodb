import axios from 'axios';
import {Server} from '../config';


async function sendRequest(path,method,data,header) {
  
    const config = {
        method: method,
        url: Server.url+path,
    };
    if(data!={}){
        config['data'] =data;

    }
    
    // BY DEFAULT HEADER WILL BE EMPTY
    // SKIPED ALL AUTH  SO HEADER WILL BE EMPTY
   if(header!=undefined){
        config['header'] =header;
        
    }
    console.log(config);
    let result = await axios(config).then(res=>{
      if(res.status !=200) {
         return;
      }
      return res;
    }).catch(err=>{
        console.log(err)
    });
   return result;

    
}

export default sendRequest;


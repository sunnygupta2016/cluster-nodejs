const express = require("express")  
const cluster = require('cluster')    
const os = require('os')

const numberOfCpu = os.cpus().length
//console.log(numberOfCpu)
const app = express()

app.get('/',(req,res)=>{

    for(let i=0;i<1e8;i++){

    }
    res.send(`....OK  ${process.pid}`)
    cluster.worker.kill()
})

if(cluster.isMaster){
   for(let i=0;i<numberOfCpu;i++){
       cluster.fork()
   }
   cluster.on('exit',(worker,code,signal)=>{

       console.log(`worker ${worker.process.pid} died`)
       cluster.fork()
   })
}else{
    app.listen(4000,()=> console.log(`server is ${process.pid}  http://localhost:4000`))
}

//app.listen(4000,()=> console.log(`server is ${process.pid}  http://localhost:4000`))
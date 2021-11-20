if(i == (length-1)){
    console.log('done')
   for(var key in file){
       out[key] = file[key]
   } 
   console.log(out)
   response.send(out)
}else if(i > length){
   return
}
else{
   for(var key in file){
       out[key] = file[key]
   } 
   getData()
}
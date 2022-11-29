let square = (num,t=0) => {

    if(num != undefined){
        if(num < 0 || num > 0){
            return num*num;
        }else if(num == 'Infinity'){
            return Infinity;
        }else{
            return 0;
        }
        

    }else{
        return "Please enter numbers";
    }

}
module.exports = square;

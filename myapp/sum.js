let sum = (a,b) => {
    if((typeof a === 'number' && typeof b === 'number') && (typeof a != 'undefined' || typeof b != 'undefined')){
        if(a && b){
            return a+b;
        }else{
            return 0;
        }
    }else if(typeof a === 'string' || typeof b === 'string'){
        return "Please enter numbers";
    }else{
        return 0;
    }
};
module.exports = sum;
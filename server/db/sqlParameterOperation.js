module.exports = function(sqlRequest, params){
    for(var key in params){
        var value = params[key];
        sqlRequest.addParameter(key, value[1], value[0]);
    }
};


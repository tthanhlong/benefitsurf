
/*
 * This function is used to get parameter from address bar
 * @return {String}: value is filtered on andress bar
 */
function queryString() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;            
}

function redirectFromAToB(from, to){
	alert('chay vao day');
	if(window.location.href == from){
		window.location.href = to;
	}
}
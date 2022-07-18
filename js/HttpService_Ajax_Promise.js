function makePromiseCall(methodType, url, async = true, data = null){
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            //console.log("State Change Called, Ready State: " + xhr.readyState + " Status : " + xhr.status +" "+getTime());
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }
                else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    })
                    console.log("Handle 400 Client Error 500 Server Error");
                }
            }
        }
        xhr.onerror = function (){
            reject({
                status : this.status,
                statusText : this.statusText
            });
        }
        xhr.open(methodType, url, async)
        if (data) {
            console.log("Data To Be Added : " + JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else {
            xhr.send();
        }
        console.log(methodType + " Request Send To Server");
    });
} 

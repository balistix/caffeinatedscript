let url = "https://www.nespresso.com/ecapi/products/v2/my/B2C/capsules?language=en&catalogType=standard&strictCategory=true&onlyVirtual=false"
let skuURL = "https://www.nespresso.com/ecapi/products/v2/my/B2C/"

var request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        var resp = this.response;
        const parsedData = JSON.parse(resp)

        parsedData.forEach(parseSku)

        function parseSku(currentSku, index, arr) {
            sku = currentSku['id'].replace('erp.my.b2c/prod/', '');
            getSkuData(sku)
        }
    } else {
        // We reached our target server, but it returned an error

    }
};

request.onerror = function () {
    // There was a connection error of some sort
};

request.send();

function getSkuData(sku) {
    let skuUrl = skuURL + btoa(sku) + '?language=en'
    var request = new XMLHttpRequest();
    request.open('GET', skuUrl, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var resp = this.response;
            const parsedData = JSON.parse(resp)
            console.log(parsedData)
        } else {

        }
    };

    request.onerror = function () {

    };
    
    request.send();
}

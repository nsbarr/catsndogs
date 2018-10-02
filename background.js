


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
        
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function() {
            console.log(JSON.parse(xhr.responseText));
            var watsonStuff = (JSON.parse(xhr.responseText));
            sendResponse(watsonStuff);
            
        });

        xhr.open('get', `https://cors-anywhere.herokuapp.com/https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?url=${request.url}&version=2018-03-19`, true);

        xhr.setRequestHeader('Authorization', 'Basic ' + 'YXBpa2V5OlUxb2ZYbC1hdU1EcVgxd0pWT1ZKa3p1NDdWZ3YwclBqR1MwZERUUmJfX2NO');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();
        return true;
    });

//curl for the URL
//curl -u "apikey:U1ofXl-auMDqX1wJVOVJkzu47Vgv0rPjGS0dDTRb__cN" "https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?url=URL&version=2018-03-19"
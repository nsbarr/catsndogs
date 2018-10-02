const imagesProcessed = {}

function processImages(){
    var imgs = document.querySelectorAll('.AdaptiveMediaOuterContainer img');
    console.log(imgs);
    for (var i = 0; i < imgs.length; i++) {
        var imgSrc = imgs[i].src;
        if (imagesProcessed[imgSrc]) {
            continue;
        }
        console.log(imgSrc);
        // Send to background script
        imagesProcessed[imgSrc] = true;
        chrome.runtime.sendMessage({url: imgSrc}, function(response) {
            console.log(response);
            lookForDogs(response.images)
        });

    }
}

function lookForDogs(images){
    let foundDog = false;
    const imgUrl = images[0].source_url;
    var imgClasses = images[0].classifiers[0].classes;
    // looking at each of the classes reported by Watson
    for (var i = 0; i < imgClasses.length; i++) {
        var imgClass = imgClasses[i];
        //imgClass.class, imgClass.score
        if (imgClass.class == "dog" && imgClass.score > 0.4){
            // it's a dog!
            console.log("it's a dog");
            console.log(imgUrl)
            foundDog = true;
        }
        else{
            // it's not a dog :(
        }
    }
    if (!foundDog){
        console.log("it's not a dog :(");
        console.log(imgUrl)
        document.querySelector(`img[src="${imgUrl}"]`).closest('li.stream-item').style.display = 'none';
    }
}
window.onload = window.setInterval(processImages, 3000);



// Listen for background script messages
function flip(element) {
    let imgs = element.querySelectorAll('img');
    console.log(imgs);
    for(let i = 0; i < imgs.length; i++)
        imgs[i].classList.toggle('hidden');
}
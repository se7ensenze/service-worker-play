if('serviceWorker' in navigator)
{
    console.log('service worker is supported');

    window.addEventListener('load', ()=> {
        navigator.serviceWorker
            .register('../sw_cached_pages.js')
            .then(reg => {
                console.log('service worker is registered');
            })
            .catch(err => {
               console.log('service worker is error :=', err); 
            });
    })
}
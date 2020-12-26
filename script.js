//  register serviceWorker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', registerServiceWorker)
}

function registerServiceWorker() {
    navigator.serviceWorker.register('sw-offline.js')
        .then(res => console.log('service Worker Registered'))
        .catch(err => console.log(err))

}
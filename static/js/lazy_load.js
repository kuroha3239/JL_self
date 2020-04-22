const watcher = new IntersectionObserver(onEnterView)
const lazyImages = document.querySelectorAll('img.lazy')
for (let image of lazyImages) {
    watcher.observe(image) // 開始監視
}

function onEnterView(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            // 監視目標進入畫面
            const img = entry.target
            img.setAttribute('src', img.dataset.src) // 把值塞回 src
            img.removeAttribute('data-src')
            observer.unobserve(img) // 取消監視
        }
    }
}
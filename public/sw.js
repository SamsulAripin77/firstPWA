if ("serviceWorker" in navigator)
{
    window.addEventListener("load", function()
    {
        navigator.serviceWorker.register("/service-worker.js").then(function()
        {
            console.log("service worker berhasil di daftarkan")
        })
        .catch(function()
    {
        console.log("service worker gagal")
    })
    })
   
}
else 
{
    console.log("service worker belum didukung browser")
}
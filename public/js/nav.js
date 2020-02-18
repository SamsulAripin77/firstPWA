document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadnav()
  var page = window.location.hash.substr(1)
  if (page == "") page = "home";
  loadpage(page)

//fungsi untuk meload conten ketika onClick navbar 
function loadpage(page)
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function()
  {
    if (this.readyState == 4)
    {
      var content = document.querySelector("#body-content")
      if (this.status == 200)
      {
        content.innerHTML = xhttp.responseText;
      }
      else if (this.status == 404)
      {
        content.innerHTML = "<p>Halaman tidak ditemukan</p>"
      }
      else 
      {
        content.innerHTML = "<p>Akses ditolak</p>"
      }
    }
  }
  xhttp.open("GET","pages/"+page+".html",true);
  xhttp.send();
}


function loadnav()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ()
  {
    if (this.readyState == 4)
    {
      if (this.status != 200 ) return;

      //memuat kontent navbar dan sidebar
      document.querySelectorAll(".topnav, .sidenav").forEach(function(elm)
      {
        elm.innerHTML = xhttp.responseText;
      })

      document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm)
      {
        elm.addEventListener("click", function(event)
        {
          var sidenav = document.querySelector(".sidenav")
          M.Sidenav.getInstance(sidenav).close()

          //memuat kontent halaman
          page = event.target.getAttribute("href").substr(1);
          loadpage(page);
        })
      })
    }
  }
  xhttp.open("GET", "nav.html", true)
  xhttp.send()
}
});
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last updated: " + new Date(document.lastModified).toLocaleString();
  });
  


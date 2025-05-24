const play = document.getElementById('play');
const body = document.getElementById('body');
const nastroyki = document.getElementById('nastroyki');
const zakrit_p = document.getElementById('x');
const u = document.getElementById('u');
const n_u = document.getElementById('n_u');
const s = document.getElementById('s');
const z = document.getElementById('z');
const slovo = document.getElementById('slovo');
const zakrit_n = document.getElementById('dom');
const zakrit_g = document.getElementById('dom_g');
const zanovo = document.getElementById('zanovo');
const zanovo_r = document.getElementById('zanovo_r');
const zakrit_r = document.getElementById('dom_r');
const r_u = document.getElementById('ugadal');
const r_nu = document.getElementById('ne_ugadal');
const r = document.getElementById('result');
const z_img = z.querySelector('img');
const volumeImages = [
	{ img: 'zvuk(100).png', volume: 1.0 },
	{ img: 'zvuk(66).png', volume: 0.6 },
	{ img: 'zvuk(33).png', volume: 0.3 },
	{ img: 'zvuk(0).png', volume: 0.0 }
];
let ugadal = 0
let ne_ugadal = 0
let p = 0
let slova_10 = [];
let bg = 'z.png';
let volumeLevel = 1.0;
let volumeStage = 0;
let words = [
		"Ӏаж", "бепиг", "хи", "цӀа", "малх", "бутт", "седа", "дитт", "зезаг", "хьун",
        "лам", "хи", "жӀаьла", "цициг", "олхазар", "чӀара", "стаг", "кӀант", "йоӀ", "да",
        "нана", "ваша", "йиша", "деда", "баба", "доттагӀ", "мостагӀ", "ишкола", "жайна",
        "стол", "гӀант", "кор", "неӀ", "пен", "чоь", "маьнги", "машен", "некъ", "тӀай",
        "юрт", "гӀала", "туька", "шура", "жижиг", "чай", "чорпа", "юург", "галеш", "тарх",
        "гӀаж", "вилка", "куьг", "ког", "корта", "бӀаьрг", "лерг", "хьаж", "бага", "дог",
        "болх", "аре", "беш", "буц", "тӀулг", "латта", "стигал", "цӀе", "догӀа", "ло",
        "мох", "шийла", "йовхо", "йовха", "де", "буьйса", "Ӏуьйре", "суьйре", "хан", "шо",
        "бутт", "кӀира", "сахьт", "минот", "шолгӀа", "дош", "илли", "хелхар", "ловзар", "ведда",
        "кхиссавала", "велар", "бӀаьрхиш", "хазахетар", "кхерар", "безам", "баьццара",
		"доттагӀалла", "ницкъ", "могашалла", "хаарш", "некъ",  "къолам", "маьӀна", "жайна",
        "эмкал", "жӀаьла", "цициг", "олхазар", "чӀара", "говр", "етт", "хьакха", "жий", "газа",
        "пхьагал", "ча", "борз", "цхьогал", "цӀоькъалом", "лом", "пил", "къамел", "маймал",
        "ГӀаз", "котам", "кхокха", "Туркойчоь", "пхьид", "уьнтӀапхьид", "лаьхьа", "гезг",
        "цӀазам", "полла", "гӀалат", "накхармоза", "чуьрк", "цаьпцалг", "ЦӀен", "сийна",
		"можа", "Ӏаьржа", "кӀайн", "сира", "хӏаваъ", "диинат", "зингат", "ӏаж", "пхьарс", "пха",
		"чим", "диг", "мукх", "ча", "маж", "маьнга", "накхармоза", "кема", "дегӏ", "даьӏахк",
		"бепиг", "тӏай", "ваша", "сту", "полла", "эмкал", "чӏурам", "цициг", "бесни", "нехча",
		"балл", "бер", "чӏениг", "гӏала", "марха", "кӏора", "къахьо", "цӏаста", "бамба", "етт",
		"къиг", "йоӀ", "де", "далар", "гӏум-аре", "дошам", "жӏаьла", "вир", "тӏадам", "бад",
		"лерг", "хӏоа", "пийл", "мостагӏ", "суьйре", "бӏаьрг", "юьхь", "доьзал", "да", "пӏелг",
		"чӏара", "борц", "бутт", "гу", "дахка", "дин", "ког", "кхокха", "лам", "малх", "меза",
        "моза", "мотт", "мохк", "некъ", "неца", "нохчийн мотт", "нуй", "пах", "цӏе", "аьрзу",
		"пӏенда", "сай", "сеса", "сула", "тхов", "тӏаде", "тӏеда", "херх", "хола", "хьач",
        "авст", "агӏо", "алкханч", "бадарж", "бедар", "бож", "боргӏал", "борз", "борш",
        "бухӏа", "цхьаъ", "шиъ", "кхоъ", "диъ", "пхиъ", "ялх", "ворхІ", "бархІ", "исс", "итт",
        "цхьайтта", "шийта", "кхойтта", "дейтта", "пхийтта", "ялхитта", "вуьрхІитта", "берхІитта",
		"ткъайоьссина", "ткъа", "ткъе цхьаъ", "ткъе шиъ", "ткъе кхоъ", "ткъе диъ", "ткъе пхиъ",
		"ткъе ялх", "ткъе ворхІ", "ткъе бархІ", "ткъе исс", "тъке итт", "шовзткъа", "бумбари",
		"кхузткъа", "кхузткъе итт", "дезткъа", "дезткъе итт", "бІе", "куьзга", "кор",
        "хӀорд", "мутта", "хан", "сахьт", "гӀайба", "неӀ","лахьорч", "дуьне", "пхьид",
		"тӀом", "Оьрсийчоь", "саьрмик", "болх", "иту", "четар", "абат", "шовзткъе итт",
];
let random = words[Math.floor(Math.random() * words.length)];
let finish_t = null;
function time() {
	let seconds = 60;
	const timer = document.getElementById("timer");
	timer.textContent = seconds;
	if (finish_t !== null) {
		clearInterval(finish_t);
	}
	finish_t = setInterval(() => {
		seconds--;
		timer.textContent = seconds;
		if (seconds <= 0) {
			clearInterval(finish_t);
			finish_t = null;
			bg = 'r.png';
			update_b();
		}
	}, 1000);
}
function resultat() {
	ne_ugadal = slova_10.lenght + ne_ugadal;
	r_u.textContent = 'хиъна  ' + ugadal;
	r_nu.textContent = 'ца хиъна  ' + ne_ugadal;
	r.textContent = 'хилам  ' + (ugadal * 10) + '%';
	r_nu.style.display = 'block';
	r_u.style.display = 'block';
	r.style.display = 'block';
}
function no_resultat() {
	r_nu.style.display = 'none';
	r_u.style.display = 'none';
	r.style.display = 'none';
}
function spisok() {
	slova_10 = [];
	for (let i = 0; i < 10; i++) {
		random = words[Math.floor(Math.random() * words.length)];
		slova_10.push(random);
	}
	slovo.textContent = slova_10[p];
}
function p_u() {
	slova_10.splice(p, 1);
	if (slova_10.length === 0) {
		bg = 'r.png';
		update_b();
	}
	if (p > (slova_10.length - 1)) {
		p = 0;
	}
	slovo.textContent = slova_10[p];
}
function zvuk() {
	const zvuk_click = new Audio('click.mp3');
	zvuk_click.volume = volumeLevel;
	zvuk_click.play();
}
function update_b() {
	if (bg === 'z.png') {
		 play.style.display = 'block';
		 nastroyki.style.display = 'block';
		 zakrit_n.style.display = 'none';
		 z.style.display = 'none';
		 u.style.display = 'none';
		 n_u.style.display = 'none';
		 s.style.display = 'none';
		 slovo.style.display = 'none';
		 timer.style.display = 'none';
		 zakrit_p.style.display = 'none';
		 zakrit_g.style.display = 'none';
		 zanovo.style.display = 'none';
		 zanovo_r.style.display = 'none';
		 zakrit_r.style.display = 'none';
		 no_resultat();
	} else if (bg === 'n.png') {
		 play.style.display = 'none';
		 nastroyki.style.display = 'none';
		 zakrit_n.style.display = 'block';
		 z.style.display = 'block';
		 u.style.display = 'none';
		 n_u.style.display = 'none';
		 s.style.display = 'none';
		 slovo.style.display = 'none';
		 timer.style.display = 'none';
		 zakrit_p.style.display = 'block';
		 zakrit_g.style.display = 'none';
		 zanovo.style.display = 'none';
		 zanovo_r.style.display = 'none';
		 zakrit_r.style.display = 'none';
		 no_resultat();
	} else if (bg === 'g.png') {
		 play.style.display = 'none';
		 nastroyki.style.display = 'none';
		 zakrit_n.style.display = 'none';
		 z.style.display = 'none';
		 u.style.display = 'block';
		 n_u.style.display = 'block';
		 s.style.display = 'block';
		 slovo.style.display = 'block';
		 timer.style.display = 'block';
		 zakrit_p.style.display = 'none';
		 zakrit_g.style.display = 'block';
		 zanovo.style.display = 'block';
		 zanovo_r.style.display = 'none';
		 zakrit_r.style.display = 'none';
		 no_resultat();
	} else {
		play.style.display = 'none';
		nastroyki.style.display = 'none';
		zakrit_n.style.display = 'none';
		z.style.display = 'none';
		u.style.display = 'none';
		n_u.style.display = 'none';
		s.style.display = 'none';
		slovo.style.display = 'none';
		timer.style.display = 'none';
		zakrit_p.style.display = 'none';
		zakrit_g.style.display = 'none';
		zanovo.style.display = 'none';
		zanovo_r.style.display = 'block';
		zakrit_r.style.display = 'block';
		resultat();
	}
	body.style.backgroundImage = `url('phoni/${bg}')`;
}

update_b();

play.addEventListener('click', () => {
	if (bg === 'z.png') {
		zvuk();
		bg = 'g.png';
		update_b();
		spisok();
		time();
		ugadal = 0;
		ne_ugadal = 0;
	}
});
zanovo_r.addEventListener('click', () => {
	if (bg === 'r.png') {
		zvuk();
		bg = 'g.png';
		update_b();
		spisok();
		time();
		ugadal = 0;
		ne_ugadal = 0;
	}
});
zanovo.addEventListener('click', () => {
	if (bg === 'g.png') {
		zvuk();
		update_b();
		spisok();
		time();
		ugadal = 0;
		ne_ugadal = 0;
	}
});
nastroyki.addEventListener('click', () => {
	if (bg === 'z.png') {
		zvuk();
		bg = 'n.png';
		update_b();
	}
});
zakrit_g.addEventListener('click', () => {
	if (bg === 'g.png') {
		zvuk();
		bg = 'z.png';
		update_b();
	}
});
zakrit_r.addEventListener('click', () => {
	if (bg === 'r.png') {
		zvuk();
		bg = 'z.png';
		update_b();
	}
});
zakrit_n.addEventListener('click', () => {
	if (bg === 'n.png') {
		zvuk();
		bg = 'z.png';
		update_b();
	}
});
zakrit_p.addEventListener('click', () => {
	if (bg === 'n.png') {
		zvuk();
		window.close();
		setTimeout(() => {
			window.location.href = '/';
		}, 100);
	}
});

u.addEventListener('click', () => {
	if (bg === 'g.png') {
		zvuk();
		p_u();
		ugadal++;
		update_b();
	}
});
n_u.addEventListener('click', () => {
	if (bg === 'g.png') {
		zvuk();
		p_u();
		ne_ugadal++;
		update_b();
	}
});
s.addEventListener('click', () => {
	if (bg === 'g.png') {
		zvuk();
		p++
		if (p > (slova_10.length - 1)) {
			p = 0;
		}
		slovo.textContent = slova_10[p];
		update_b();
	}
});
z.addEventListener('click', () => {
	zvuk();
	volumeStage = (volumeStage + 1) % volumeImages.length;
	const current = volumeImages[volumeStage];
	volumeLevel = current.volume;
	z_img.src = `knopki/zastavka/gromkost/${current.img}`;
});

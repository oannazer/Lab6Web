// script.js
const judul = document.getElementById("judul");
// const pesan = document.getElementById("pesan");
judul.textContent = "Belajar JavaScript DOM";
// pesan.textContent = "Konten berhasil diubah oleh JavaScript.";

const tombol = document.getElementById("tombolAksi");
const pesan = document.getElementById("pesan");

tombol.addEventListener("click", function () {
	pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});

const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");
tombolGaya.addEventListener("click", function () {
	teksGaya.classList.toggle("highlight");
	teksGaya.classList.toggle("teks-besar");
});

const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");
namaInput.addEventListener("input", function () {
	jumlahKarakter.textContent = namaInput.value.length;
});

const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");
form.addEventListener("submit", function (event) {
	event.preventDefault();
	const nama = document.getElementById("nama").value.trim();
	const email = document.getElementById("email").value.trim();
	const usiaInput = document.getElementById("usia").value;
	const usia = Number(usiaInput);
	const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (nama === "") {
		pesanForm.textContent = "Nama wajib diisi.";
	} else if (!polaEmail.test(email)) {
		pesanForm.textContent = "Masukkan email yang valid. (example@gmail.com)";
	} else if (
		usiaInput === "" ||
		!Number.isInteger(usia) ||
		usia < 17 ||
		usia > 100
	) {
		pesanForm.textContent = "Usia harus berupa bilangan bulat 17–100.";
	} else {
		pesanForm.textContent = "Validasi berhasil. Form siap diproses.";
		alert("Validasi berhasil. Form siap diproses.");
		form.reset();
	}
});

const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");
tambahTugas.addEventListener("click", function () {
	const teks = inputTugas.value.trim();
	if (teks === "") {
		pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
		return;
	}
	const item = document.createElement("li");
	const label = document.createElement("span");
	const selesai = document.createElement("button");
	label.textContent = teks + " ";
	selesai.type = "button";
	selesai.textContent = "Tandai selesai";
	selesai.addEventListener("click", function () {
		item.classList.toggle("selesai");
		selesai.textContent = item.classList.contains("selesai")
			? "Batalkan selesai"
			: "Tandai selesai";
	});
	item.append(label, selesai);
	daftarTugas.appendChild(item);
	inputTugas.value = "";
	pesanTugas.textContent = "Tugas ditambahkan.";
	inputTugas.focus();
});

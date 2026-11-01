// script.js - Mini Project: Form Pendaftaran Workshop

const form = document.getElementById("formWorkshop");
const namaInput = document.getElementById("nama");
const emailInput = document.getElementById("email");
const sesiSelect = document.getElementById("sesi");
const catatanInput = document.getElementById("catatan");
const jumlahCatatan = document.getElementById("jumlahCatatan");
const tombolReset = document.getElementById("tombolReset");
const pesanStatus = document.getElementById("pesanStatus");

const errorNama = document.getElementById("errorNama");
const errorEmail = document.getElementById("errorEmail");
const errorSesi = document.getElementById("errorSesi");

const ringkasNama = document.getElementById("ringkasNama");
const ringkasEmail = document.getElementById("ringkasEmail");
const ringkasSesi = document.getElementById("ringkasSesi");

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fitur 1 - Ringkasan input dan penghitung karakter secara langsung
function teksSesiTerpilih() {
	if (sesiSelect.value === "") return "";
	return sesiSelect.options[sesiSelect.selectedIndex].textContent;
}

function perbaruiRingkasan() {
	ringkasNama.textContent = namaInput.value.trim() || "-";
	ringkasEmail.textContent = emailInput.value.trim() || "-";
	ringkasSesi.textContent = teksSesiTerpilih() || "-";
	jumlahCatatan.textContent = catatanInput.value.length;
}

// Fitur 2 - Validasi nama, email, dan pilihan sesi
function setError(kolom, elemenError, teks) {
	elemenError.textContent = teks;
	kolom.classList.toggle("invalid", teks !== "");
}

function bersihkanError() {
	setError(namaInput, errorNama, "");
	setError(emailInput, errorEmail, "");
	setError(sesiSelect, errorSesi, "");
}

function validasiForm() {
	let kolomPertamaSalah = null;

	if (namaInput.value.trim() === "") {
		setError(namaInput, errorNama, "Nama wajib diisi.");
		kolomPertamaSalah = kolomPertamaSalah || namaInput;
	} else {
		setError(namaInput, errorNama, "");
	}

	if (!polaEmail.test(emailInput.value.trim())) {
		setError(emailInput, errorEmail, "Masukkan email yang valid.");
		kolomPertamaSalah = kolomPertamaSalah || emailInput;
	} else {
		setError(emailInput, errorEmail, "");
	}

	if (sesiSelect.value === "") {
		setError(sesiSelect, errorSesi, "Pilih salah satu sesi workshop.");
		kolomPertamaSalah = kolomPertamaSalah || sesiSelect;
	} else {
		setError(sesiSelect, errorSesi, "");
	}

	return kolomPertamaSalah;
}

// Fitur 3 - Pesan kesalahan dan pesan sukses pada halaman
function tampilkanStatus(teks, jenis) {
	pesanStatus.textContent = teks;
	pesanStatus.className = teks === "" ? "status" : "status " + jenis;
}

// Event input dan change: ringkasan diperbarui saat pengguna mengisi
namaInput.addEventListener("input", function () {
	perbaruiRingkasan();
	setError(namaInput, errorNama, "");
});
emailInput.addEventListener("input", function () {
	perbaruiRingkasan();
	setError(emailInput, errorEmail, "");
});
catatanInput.addEventListener("input", perbaruiRingkasan);
sesiSelect.addEventListener("change", function () {
	perbaruiRingkasan();
	setError(sesiSelect, errorSesi, "");
});

// Event submit: validasi sebelum data diproses
form.addEventListener("submit", function (event) {
	event.preventDefault();
	const kolomSalah = validasiForm();

	if (kolomSalah) {
		tampilkanStatus("Pendaftaran gagal. Periksa kembali isian Anda.", "gagal");
		kolomSalah.focus();
		return;
	}

	const nama = namaInput.value.trim();
	const sesi = teksSesiTerpilih();
	form.reset();
	perbaruiRingkasan();
	tampilkanStatus(
		"Terima kasih, " + nama + ". Pendaftaran untuk " + sesi + " berhasil.",
		"sukses",
	);
});

// Event click: tombol hapus input
tombolReset.addEventListener("click", function () {
	form.reset();
	bersihkanError();
	perbaruiRingkasan();
	tampilkanStatus("Semua input telah dihapus.", "sukses");
	namaInput.focus();
});

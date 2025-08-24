const fs = require('fs');
const path = require('path');

// --- KONFIGURASI (SUDAH DIPERBAIKI) ---
// Path ini sudah disesuaikan dengan struktur folder Anda
const basePath = './src';
const layers = {
  // Nama folder disesuaikan dengan screenshot Anda
  Applications: path.join(basePath, 'Applications'),
  Commons: path.join(basePath, 'Commons'),
  Domains: path.join(basePath, 'Domains'),
  Infrastructures: path.join(basePath, 'Infrastructures'),
  Interfaces: path.join(basePath, 'Interfaces'),
};
// --------------------

// Fungsi untuk menganalisis direktori secara rekursif
function analyzeDirectory(directoryPath) {
  let totalClasses = 0;
  let abstractClasses = 0;

  // Hindari folder _test
  if (path.basename(directoryPath) === '_test') {
    return { totalClasses: 0, abstractClasses: 0 };
  }

  const files = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directoryPath, file.name);
    if (file.isDirectory()) {
      const result = analyzeDirectory(fullPath);
      totalClasses += result.totalClasses;
      abstractClasses += result.abstractClasses;
    } else if (file.isFile() && file.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Hitung jumlah total class
      const classMatches = content.match(/class\s+\w+/g) || [];
      if (classMatches.length > 0) {
        totalClasses += 1; // Anggap 1 file = 1 class utama
      }

      // --- LOGIKA DETEKSI DIUBAH ---
      // Deteksi abstract class dengan mencari teks spesifik
      if (content.includes('METHOD_NOT_IMPLEMENTED')) {
        abstractClasses += 1;
      }
      // -----------------------------
    }
  }

  return { totalClasses, abstractClasses };
}

// --- EKSEKUSI ---
console.log('=== Analisis Metrik Abstraksi (SAP) ===');
const results = {};

for (const layerName in layers) {
  const layerPath = layers[layerName];
  if (fs.existsSync(layerPath)) {
    const { totalClasses, abstractClasses } = analyzeDirectory(layerPath);
    const abstractness = totalClasses > 0 ? abstractClasses / totalClasses : 0;
    results[layerName] = {
      Na: abstractClasses,
      Nc: totalClasses,
      A: abstractness.toFixed(2),
    };
  } else {
    // Tambahkan pesan jika folder tidak ditemukan
    console.warn(`[PERINGATAN] Folder untuk layer '${layerName}' tidak ditemukan di: ${layerPath}`);
    results[layerName] = { Na: 0, Nc: 0, A: (0).toFixed(2) };
  }
}

// Tampilkan hasil dalam format tabel
console.table(results);

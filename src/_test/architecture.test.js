// tests/architecture.test.js (menggunakan Jest)
const fs = require('fs');
const path = require('path');

// Direktori root proyek (asumsi test folder berada di root/tests)
// Sesuaikan path ini jika folder 'src' Anda tidak langsung berada di atas 'tests'
const srcDir = path.join(__dirname, '../src');

// Helper untuk mendapatkan path file dalam sebuah direktori secara rekursif
const getFilesInDir = (dir) => {
  try {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      if (entry.isFile() && entry.name.endsWith('.js')) {
        // Menargetkan file .js
        files.push(entryPath);
      } else if (entry.isDirectory()) {
        files.push(...getFilesInDir(entryPath)); // Rekursif
      }
    }
    return files;
  } catch (error) {
    // console.warn(`Could not read directory ${dir}: ${error.message}`); // Untuk debugging
    return []; // Direktori mungkin tidak ada
  }
};

describe('Clean Architecture Dependency Rules', () => {
  const domainsPath = path.join(srcDir, 'Domains');
  const applicationsPath = path.join(srcDir, 'Applications');
  const interfacesPath = path.join(srcDir, 'Interfaces'); // Asumsi: Port/Abstraksi
  const infrastructuresPath = path.join(srcDir, 'Infrastructures');
  const commonsPath = path.join(srcDir, 'Commons'); // Termasuk exceptions

  // Helper untuk membuat regex path berdasarkan alias umum atau path relatif
  // Menambahkan opsi untuk menangani require() juga
  const createPathRegex = (layerName) => new RegExp(`(?:from|require\\()['"](?:\\.\\.\\/${layerName}|@\\/${layerName})`);

  // Aturan 1: Domains layer tidak boleh mengimpor dari lapisan di luar dirinya sendiri
  // Kecuali Commons/exceptions, karena itu adalah utilitas umum.
  test('Domains layer should not import from Applications, Interfaces, Infrastructures, or other external layers (except Commons/exceptions)', () => {
    const domainFiles = getFilesInDir(domainsPath);
    for (const file of domainFiles) {
      const content = fs.readFileSync(file, 'utf8');

      expect(content).not.toMatch(createPathRegex('Applications'));
      expect(content).not.toMatch(createPathRegex('Interfaces'));
      expect(content).not.toMatch(createPathRegex('Infrastructures'));

      // Catatan: Commons/exceptions dianggap aman untuk diimpor oleh Domains jika memang agnostik
    }
  });

  // Aturan 2: Applications layer hanya boleh mengimpor dari Domains dan Interfaces (Ports)
  // Tidak boleh dari Infrastructures
  test('Applications layer should only import from Domains and Interfaces, not Infrastructures', () => {
    const applicationFiles = getFilesInDir(applicationsPath);
    for (const file of applicationFiles) {
      const content = fs.readFileSync(file, 'utf8');

      // Seharusnya tidak mengimpor dari Infrastructures
      expect(content).not.toMatch(createPathRegex('Infrastructures'));

      // Jika Interfaces adalah Port (yang diimplementasikan Infrastructure), maka Applications boleh menggunakannya
      // Jika Interfaces adalah adapter/presentation, maka ini harus disesuaikan (Apps masih boleh import Domains)
      // Namun asumsi saat ini adalah Interfaces = Ports.
    }
  });

  // Aturan 3: Interfaces layer (asumsi Port/Abstraksi) tidak boleh bergantung pada Infrastructures
  test('Interfaces layer (Ports/Abstractions) should not import from Infrastructures', () => {
    const interfacesFiles = getFilesInDir(interfacesPath);
    for (const file of interfacesFiles) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(createPathRegex('Infrastructures'));
      // Interfaces juga tidak boleh bergantung pada Applications atau Commons yang spesifik (hanya Domains jika perlu)
      expect(content).not.toMatch(createPathRegex('Applications'));
    }
  });

  // Aturan 4: Infrastructures layer boleh mengimpor dari semua lapisan di dalamnya
  // Tes ini lebih untuk memastikan tidak ada circular dependencies yang tidak disengaja ke dirinya sendiri
  // atau dependensi yang aneh (misal, infrastruktur A ke infrastruktur B yang tidak terkait).
  // Namun, deteksi siklus penuh lebih baik diserahkan ke Dependency-Cruiser.
  test('Infrastructures layer should not have self-referencing circular dependencies (complex to check here, rely on tools)', () => {
    // Placeholder. Untuk deteksi circular dependencies, disarankan menggunakan tools seperti dependency-cruiser.
    // Tes ini hanya memastikan bahwa aturan-aturan dasar Clean Architecture lainnya tidak dilanggar.
  });

  // Aturan 5: Commons/exceptions tidak boleh memiliki dependensi yang tidak diinginkan
  // Commons harusnya sangat stabil dan generik.
  test('Commons/exceptions should not import from specific application layers (Applications, Domains, Interfaces, Infrastructures)', () => {
    const commonsFiles = getFilesInDir(commonsPath);
    for (const file of commonsFiles) {
      const content = fs.readFileSync(file, 'utf8');
      // Commons harusnya tidak bergantung pada detail aplikasi
      expect(content).not.toMatch(createPathRegex('Applications'));
      expect(content).not.toMatch(createPathRegex('Domains'));
      expect(content).not.toMatch(createPathRegex('Interfaces'));
      expect(content).not.toMatch(createPathRegex('Infrastructures'));
    }
  });

  // Tes Tambahan: Pastikan 'app.js' tidak mengimpor logika bisnis secara langsung dari layer dalam
  // app.js seharusnya menjadi composition root atau entry point yang mengorchestrasi
  test('app.js should mainly compose and run the application, not contain business logic or direct infrastructure access', () => {
    const appJsPath = path.join(srcDir, 'app.js');
    if (fs.existsSync(appJsPath)) {
      const content = fs.readFileSync(appJsPath, 'utf8');
      // Contoh: app.js seharusnya mengimpor Applications layer untuk menjalankan use cases,
      // tetapi tidak mengimpor implementasi database secara langsung.
      // Ini adalah contoh, perlu disesuaikan dengan bagaimana app.js Anda dikodekan
      // expect(content).not.toMatch(/new SomeConcreteRepository/);
      // expect(content).not.toMatch(/db\.connect/);
      // Lebih baik di sini adalah memastikan app.js tidak berisi logika yang seharusnya ada di lapisan lain
    }
  });
});

const fs = require('fs');
const ExcelJS = require('exceljs');

// Baca file JSON
const rawData = fs.readFileSync('output.json', 'utf8');
const jsonData = JSON.parse(rawData);

// Buat workbook dan worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Dependency Report');

// Header kolom
worksheet.columns = [
  { header: 'From File', key: 'fromFile', width: 50 },
  { header: 'To Dependency', key: 'toDependency', width: 50 },
  { header: 'Instability', key: 'instability', width: 15 },
  { header: 'Afferent', key: 'afferent', width: 10 },
  { header: 'Efferent', key: 'efferent', width: 10 },
];

// Loop data
jsonData.modules.forEach((module) => {
  const fromFile = module.source;
  const instability = module.metrics?.instability || '';
  const afferent = module.metrics?.afferentCouplings || '';
  const efferent = module.metrics?.efferentCouplings || '';

  if (module.dependencies && module.dependencies.length > 0) {
    module.dependencies.forEach((dep) => {
      worksheet.addRow({
        fromFile,
        toDependency: dep.resolved,
        instability,
        afferent,
        efferent,
      });
    });
  } else {
    worksheet.addRow({
      fromFile,
      toDependency: '',
      instability,
      afferent,
      efferent,
    });
  }
});

// Styling header
worksheet.getRow(1).eachCell((cell) => {
  cell.font = { bold: true };
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
});

// Simpan file Excel
workbook.xlsx
  .writeFile('dependency_report.xlsx')
  .then(() => {
    console.log('✅ File dependency_report.xlsx berhasil dibuat!');
  })
  .catch((err) => {
    console.error('❌ Gagal membuat file Excel:', err);
  });

const XLSX = require('xlsx');

class ExcelReaderS {
    leerExcel({file}) {
        return new Promise((resolve, reject) => {
            try {
                let excel = XLSX.readFile(file.tempFilePath);
                let first_sheet_name = excel.SheetNames[0];
                let worksheet = excel.Sheets[first_sheet_name];
                resolve({success: true, usuarios: XLSX.utils.sheet_to_json(worksheet, {raw: true})});
            } catch (e) {
                console.error(e);
                resolve({success: false, causa: e});
            }
        });
    }
}

module.exports = ExcelReaderS;

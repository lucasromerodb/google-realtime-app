function writeDataToFirebase() {
  const firebaseUrl = "<firebase_url>";
  const secret = "<firebase_secret_id>";
  const base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);

  const spreadsheetId = "<google_sheet_id>";
  const rangeName = "<sheet_tab_name>";
  const data = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;

  if (!data) {
    Logger.log("No data found.");
  } else {
    Logger.log(data.parseData());
    base.setData("consoles", data.parseData());
  }
}

Array.prototype.parseData = function() {
  const [keys, ...rows] = this;
  return rows
    .filter(row => row.length)
    .map((row, i) => {
      let obj = {};
      row.forEach((item, i) => {
        obj = { ...obj, [keys[i]]: item };
      });
      return obj;
    });
};

function writeDataToFirebase() {
  const firebaseUrl = "https://stack-app-f2415.firebaseio.com";
  const secret = firebase.secret;
  const base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);

  const spreadsheetId = "1oK46iECNR0ROkeaCIk30gESE2CoZ3KCtMUI-yJbuLuc";
  const rangeName = "consoles";
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

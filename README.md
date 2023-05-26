# Railway-concession-system

Some government offices that still are using manual processes to do day to day work. One of them is Railway IRCTC Mumbai. Every process of the Ticket Booking System is digitalized except the student concession form process. There are nearly 227 colleges in Mumbai and suburbs and more than 45k/50k students apply for railway concession form. Every college has its own different process for applying for a railway concession form. Some college has online website to collect data of students and some colleges are still struggling with offline form process which takes more than 2-3 days or sometimes if office authority person is not available students have to wait for hours or sometimes even for many days to collect their forms with college stamp and signature of authority.Either college provide online service to student to fill their form or fill it manually at the end student has to take that form to railway ticket counter and railway authority person do manual process to fill student details and check student college id by that time verify student details. It takes a minimum of 6-7 minutes for every student.
So, to save time and all the offline paper work of students, college and Railway authority I have a solution that if we make this process digitized it will save most of our time as well as at ticket counter and at college office.

* Login page
* Add an User Details
* Update Form
* Check Form status
* Accept the pending request
* Reject the form
* View history of the user
* Print the concession form.

# Steps for joining it to excel sheet
**1.Click on appscript in excel sheet.**
![image](https://github.com/Vinesh0001/Railway-concession-system/assets/114330106/08b19337-3ca8-46bb-9aed-4cd382160a1f)

**2.Copy and paste this code.**

const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()
function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}
function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1
    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }
  finally {
    lock.releaseLock()
  }
}

![image](https://github.com/Vinesh0001/Railway-concession-system/assets/114330106/1e427e5e-acb4-4390-a4ce-cb8976af18c7)

**3.Click on trigger**
![image](https://github.com/Vinesh0001/Railway-concession-system/assets/114330106/e6b77577-91f9-409f-80f5-4afc24b8b20b)

**4.Create trigger by clicking Add Trigger [plus(+)] symbol.**

**5.** ![image](https://github.com/Vinesh0001/Railway-concession-system/assets/114330106/bbb4c209-687b-4ddf-8ca1-1e39076b3712)
![image](https://github.com/Vinesh0001/Railway-concession-system/assets/114330106/a2d2eff4-bb67-4e6e-9853-f5859759d2ae)

**6.And now paste it in you js code.**

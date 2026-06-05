// ADD THIS FUNCTION to your existing Apps Script (paste alongside your other functions)
// It handles the uploadImage action in your doPost function.

// In your doPost function, add this case to the if/else chain:
//
//   } else if (action === 'uploadImage') {
//     return uploadImageToDrive(data);
//   }

function uploadImageToDrive(data) {
  try {
    var folderId = '1kxNztwzLjKVChLgesp2dauAr39vDtW7e'; // your Drive images folder
    var folder = DriveApp.getFolderById(folderId);
    
    // Delete old file with same product code if it exists
    var existingFiles = folder.getFilesByName(data.fileName);
    while (existingFiles.hasNext()) {
      existingFiles.next().setTrashed(true);
    }
    
    // Create new file from base64
    var decoded = Utilities.base64Decode(data.base64Data);
    var blob = Utilities.newBlob(decoded, data.mimeType, data.fileName);
    var file = folder.createFile(blob);
    
    // Make file publicly accessible
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Write image URL to Products sheet column H
    var sheet = SpreadsheetApp.openById('1PmDeV5XEERtj_xQnerFDeAL4HbwI8wv1VmIyKFgy7WM').getSheetByName('Products');
    var lastRow = sheet.getLastRow();
    var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]).trim() === String(data.productId).trim()) {
        sheet.getRange(i + 2, 8).setValue('https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w200');
        break;
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, fileId: file.getId() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

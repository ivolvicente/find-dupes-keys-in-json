/**
 * 2016-11-25
 * @author  Ivo Vicente <ivolvicente@gmail.com>
 * @description Find duplicated keys in JSON files
 * 
 * JSON Example Struct
 * {
    "id": 403,
    "title": "Documents",    
    "children": [
        {
            "id": 575,
            "title": "Clients",
            "children": [
                {
                    "id": 576,
                    "title": "Sales",
                    "children": []
                }....
 */
const fs = require('fs')

// Setup vars 
const keyName = "id" //
const recursiveNode = "children"
var fileList = [] // Set hardcoded .json files if you want

var jsonCollection = []
var saveIds = []

// IF you want to get all JSON files in current folder, uncomment this block
var files = fs.readdirSync('./')
for (var i in files) {
  if (files[i].toString().includes(".json")) {
    fileList.push(files[i])
  }
}
// END Uncomment

// get all json files data
fileList.forEach(function (file) {
  jsonCollection.push(require('./' + file))
})

// First line call function if fileList have samething
if (fileList.length > 0) {
  console.log("[START]")
  console.log("*** " + fileList.length + " File(s) to search")

  searchForDupes(jsonCollection)
}

// Show in console the dupes
saveIds.forEach(function (val, key) {
  if (parseInt(val) > 1) {
    console.log("*** Dupes in: " + keyName + " " + key + " - " + val+"x")
  }
})

// Recursive function
function searchForDupes(collection, callback) {

  for (var key in collection) {
    // Only defined key
    if (key) {
      // Set array position by keyName to count
      saveIds[collection[key][keyName]] =
        (saveIds[collection[key][keyName]]) ? saveIds[collection[key][keyName]] + 1 : 1

      // Check for recursiveNode      
      if (collection[key][recursiveNode]) {
        searchForDupes(collection[key][recursiveNode])
      }
    }
  }
}
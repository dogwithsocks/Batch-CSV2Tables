/*************
Set-up for this script:
1. Create tables with the number of columns and one row only
2. Insert Data Merge <<DataType>> tags to each column
3. Script label those tables with CSV
**************/
#target "InDesign"
#targetengine "mine" //My engine so that I can redefine the alert function

$.global.alert = function(){ }; //Suppressed the "done" alert

var f1 = new File ( "FILEPATH" ); //File path of CSV2TABLES here. Accessible location.

var OpenFilePath = app.activeDocument; // Declare a variable representing the open document.
var OpenFileLength = OpenFilePath.pages.length; // Get number of pages of open document and master file.

// Loop through every page.
for (var i=0; i<OpenFileLength; i++) 
{
    var PagesForWeb = false;
    
    var ItemsOnPage = OpenFilePath.pages.item(i).pageItems.length; // Get the number of items on the page.

    for (var j=0; j<ItemsOnPage; j++) // Loop through every item.
    {
        var ScriptLabel = OpenFilePath.pages.item(i).pageItems.item(j).label;   

        if (ScriptLabel != "" && ScriptLabel.indexOf("CSV") == 0) // If the item has a label and it equals what we want it to,
        {
               var myTable = OpenFilePath.pages.item(i).pageItems.item(j).tables.item(0); //myTable is a table you want to perform the script on.
               myTable.rows.item(0).select(); //Selects table's first and only row.
               app.doScript ( f1 ); //Performs CSV2TABLES
               app.select(NothingEnum.NOTHING); //Deselects all
             //this part isn't done yet. removes empty rows after data merging.
             /*
                var allCells =  allTables[tbl].cells; //Cleanup
                var cel = 0;
                while(cel < allCells.length){
                    if(allCells[cel].contents.toString().toLowerCase().indexOf("") != -1){
                    allCells[cel].rows[0].remove();
                    allCells =  allTables[tbl].cells;
                    cel = -1;
                }
            cel++;
            */
            }

        }
    }

} 


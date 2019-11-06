#target "InDesign"
#targetengine "session"

var f1 = new File ( "C:/Users/MSawettanan/InDesign/CSV2TABLES.jsxbin" );

var OpenFilePath = app.activeDocument; // Declare a variable representing the open document.
var OpenFileLength = OpenFilePath.pages.length; // Get number of pages of open document and master file.

for (var i=0; i<OpenFileLength; i++) 
{
     // Loop through every page.
    var PagesForWeb = false;
    
    var ItemsOnPage = OpenFilePath.pages.item(i).pageItems.length; // Get the number of items on the page.

    for (var j=0; j<ItemsOnPage; j++) // Loop through every item.
    {
        var ScriptLabel = OpenFilePath.pages.item(i).pageItems.item(j).label;   

        if (ScriptLabel != "" && ScriptLabel.indexOf("CSV") == 0) // If the item has a label and it equals what we want it to,
        {
               var myTable = OpenFilePath.pages.item(i).pageItems.item(j).tables.item(0);
               myTable.rows.item(0).select();
               app.doScript ( f1 );
               app.select(NothingEnum.NOTHING);

        }
    }

}


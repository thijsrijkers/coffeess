const fs = require("fs");
const parser = require("./parser");
const path = require('path')

let distpath = path.join(__dirname, '../src/');

function readTextFile()
{
    var files = fs.readdirSync(__dirname + "../../src/");

    for(var i = 0; i < files.length; i++)
        if(ReturnExtension(files[i]).toString().toLowerCase() == 'coss')      
            CompileToCSS(files[i]);   
}

function CompileToCSS(prefile)
{
  
    let data = fs.readFileSync(distpath + prefile).toString();
    const lines = data.split(/\r\n|\n/);
    var builder = "";

    lines.forEach((line) => 
    {
        var words = line.split(" "); 
        if(words.length <= 1) parser.SetEndline();
    
        words.forEach((word)=>
        {
            builder += parser.ParseContent(word);
        });

        builder += parser.Bracket();
        builder += "\n";
    });

    fs.writeFile('dist/'+prefile.substring(0, prefile.indexOf('.'))+'.css', builder, function (err) 
    {
        if (err) throw err;
            console.log('File is created successfully.');
    });
 
}

function ReturnExtension(file)
{
    return file.split('.').pop();
}

readTextFile();
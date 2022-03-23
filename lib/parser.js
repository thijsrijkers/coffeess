module.exports = 
{
    brackets:false,
    classid: false,
    endLine: false,
    ParseContent: function(parse)
    {
        switch (true) 
        {
            case parse.indexOf("id") !== -1:
                this.classIdBracket();
                return parse.replace("id", "#");
            case parse.indexOf("class") !== -1:
                this.classIdBracket();
                return parse.replace("class", ".");
            default:
                return parse;
        }
    },
    classIdBracket: function()
    {
        this.classid = true;
        this.brackets = true;
    },
    BracketCheck: function() { return this.brackets; },
    ClassIDCheck: function() { return this.classid; },
    SetEndline: function() { this.endLine = true; },
    Bracket: function() { 
        if(!this.classid && !this.brackets && !this.endLine) return "";
        if(this.classid && this.brackets){ this.classid = false; return "{"} 
        if(this.endLine && this.brackets){ this.brackets = false; this.classid = false; this.endLine = false; return "}"}  
        if(!this.classid && this.brackets && !this.endLine){ this.classid = false; return ";"} 
    }
};
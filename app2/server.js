const express = require("express");
const hbs = require("hbs");

var app = express();

app.set("view engine", hbs);
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

/* submited*/
hbs.registerHelper('submit', (num)=>{
    var html = ""
    html += "<table class='table'><tbody>";

    for(let i = 0; i < num; i++){
        html += "<tr>";
        for(let j = 0; j < num; j++){
            var color = ((1<<24)*Math.random()|0).toString(16);
            html += "<td style='background-color:#" + color + ";'>" + color + "<br/><span style='color:#ffffff;'>" + color + "</span></td>";
        }
        html += "</tr>" 
    }
    return html;
})

hbs.registerHelper('errorDivs', ()=>{
    var html = "";
    var classes = ['shrink', 'rotate', 'still'];  
    var num = Math.random() * (50 - 20) + 20;
    for(let i = 0; i < num; i++){
        var randClassName = classes[Math.floor(Math.random() * classes.length)]; 
        html += "<div class='" + randClassName + "'>" + 404 + "</div>"
    }
    return html;
});

/* Called On Error Page*/
hbs.registerHelper('ptag', (num, message) => {
    var msg = "";
    msg+=`<p>There Was An Error</p>`
    return msg;
});

app.get("/", (req, res) => {
    res.render("index.hbs")
})

app.post("/results", (req,res)=>{
  
    res.render("results.hbs", {num:Number(req.body.number)})
})

app.use((req, res, next) => {
    const error = new Error("Page Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("error.hbs", { message: `${error.message}` });
})

app.get("*", (req, res) => {
    res.render("error.hbs");
});



app.listen(3000, () => {

    console.log("Server is running on port 3000")
})


var express = require('express');  
var app = express();

app.use(express.static(__dirname+'/dist')); // Current directory is root  
app.listen(process.env.PORT || 5000);
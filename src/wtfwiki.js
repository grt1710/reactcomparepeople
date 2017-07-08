import React, { Component } from 'react';
var wtf_wikipedia = require("wtf_wikipedia");

var result;
wtf_wikipedia.from_api("Sachin", "en", function(markup){
  var obj1= wtf_wikipedia.parse(markup);
  result = obj1;
});

console.log(result);

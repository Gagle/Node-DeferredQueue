"use strict";

var dq = require ("../lib");

dq ()
    .on ("error", function (error){
      //This function is never executed because preventDefault() was called
      console.error (error);
    })
    .push (function (cb){
      process.nextTick (function (){
        console.log (1);
        cb ();
      });
    })
    .push (function (cb){
      process.nextTick (function (){
        cb (new Error ());
      });
    }, function (){
      //If this line is commented the default error handler is executed and the
      //queue is resumed, therefore, it prints:
      //1
      //[Error]
      this.preventDefault ();
    })
    .push (function (cb){
      process.nextTick (function (){
        console.log (2);
        cb ();
      });
    });

/*
1
*/
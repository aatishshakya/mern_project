module.exports=
  {
    RegisterPage: (req, res) => {
        res.render('register.ejs', {
            title: 'Registration Page',
            message: ''
        });
    },
    register:(req,res)=>{
  console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  db.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    // res.send({
    //   "code":200,
    //   "success":"user registered sucessfully"
    //     });
    res.redirect('/');
  }
  });
},
login:(req,res)=>{
  var email= req.body.email;
  var password = req.body.password;
  db.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        // res.send({
        //   "code":200,
        //   "success":"login sucessfull"
        //     });

        res.redirect('/');

      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
}
}

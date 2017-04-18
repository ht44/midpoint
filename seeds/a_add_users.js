
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
      { email:'jeff.helwig@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'guyboy' , first:'jeff' , last:'helwig', img_url:'mypic.img' , current_lat:30.265691 , current_lng:-97.749693,home_address:'1906 Mistywood Dr, Austin, TX 78746',  home_lat:30.264396 , home_lng:-97.806073 , work_lat:30.238988 , work_lng:-97.788703},
      { email:'noni.manzano@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'funnyboy' , first:'noni' , last:'manzano', img_url:'great.img' , current_lat:30.252334 , current_lng:-97.702014, home_address:'',home_lat:30.261676 , home_lng:-97.758834 , work_lat:30.245661 , work_lng:-97.779605},
      { email:'passwordturek@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'haterboy' , first:'Hayden' , last:'Turek', img_url:'mybiopic.img' , current_lat:30.304516 , current_lng:-97.716262, home_address:'',home_lat:30.276650 , home_lng:-97.747848 , work_lat:30.272351 , work_lng:-97.696693},
      { email:'jamesaproett@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'smellboy' , first:'james' , last:'proett', img_url:'rockpic.img' , current_lat:30.284212 , current_lng:-97.718989, home_address:'',home_lat:30.259711 , home_lng:-97.732642 , work_lat:30.276022 , work_lng:-97.753261},
      { email:'crys.tate@icloud.com', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.698733, current_lng:-98.034149,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { email:'bcrys.tate@icloud.com', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.720301, current_lng: -97.401365,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { email:'gcrys.tate@icloud.com', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.428103, current_lng:-97.373517,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { email:'hayden@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:29.946319, current_lng:-97.434624,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880}
      ]);
    });
};

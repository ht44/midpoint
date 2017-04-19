
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
      { email:'jeff.helwig@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'guyboy' , first:'jeff' , last:'helwig', img_url:'mypic.img' , current_lat:30.265691 , current_lng:-97.749693,home_address:'1906 Mistywood Dr, Austin, TX 78746',  home_lat:30.264396 , home_lng:-97.806073 , work_lat:30.238988 , work_lng:-97.788703},
      { email:'noni.manzano@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'funnyboy' , first:'noni' , last:'manzano', img_url:'great.img' , current_lat:30.252334 , current_lng:-97.702014, home_address:'',home_lat:30.261676 , home_lng:-97.758834 , work_lat:30.245661 , work_lng:-97.779605},
      { email:'haydenturek@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'haterboy' , first:'Hayden' , last:'Turek', img_url:'mybiopic.img' , current_lat:30.304516 , current_lng:-97.716262, home_address:'',home_lat:30.276650 , home_lng:-97.747848 , work_lat:30.272351 , work_lng:-97.696693},
      { email:'jamesaproett@gmail.com', password_digest:require('bcryptjs').hashSync('password', 10), username:'smellboy' , first:'james' , last:'proett', img_url:'rockpic.img' , current_lat:30.284212 , current_lng:-97.718989, home_address:'',home_lat:30.259711 , home_lng:-97.732642 , work_lat:30.276022 , work_lng:-97.753261},
      { email:'crys.tate@icloud.com', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.698733, current_lng:-98.034149,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'mike1', email:'mike@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.720301, current_lng: -97.401365,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'rob1', email:'rob@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.428103, current_lng:-97.373517,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'bob1', email:'bob@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.698733, current_lng:-98.034149,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'jack1', email:'jack@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.720301, current_lng:-97.401365,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'barb1', email:'barb@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.428103, current_lng:-97.373517,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'crys1', email:'crys@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.446899, current_lng:-97.898474,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'sally1', email:'sally@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.028630, current_lng:-97.812933,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'dave1', email:'dave@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:29.971170, current_lng:-97.895873,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'jeff1', email:'jeff@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.159560, current_lng:-98.210469,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'will1', email:'will@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.228758, current_lng:-98.260384,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'mindy1', email:'mindy@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.949062, current_lng:-98.131720,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'cindy1', email:'cindy@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.314662, current_lng:-97.103758,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'sadi1', email:'sadi@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:29.949654, current_lng: -97.608567,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'kyle1', email:'kyle@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:30.201508, current_lng:97.975668,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880},
      { username: 'hayden1', email:'hayden@gmail', password_digest:require('bcryptjs').hashSync('password', 10), current_lat:29.946319, current_lng:-97.434624,home_address:'', home_lat:30.260834 , home_lng:-97.776852 , work_lat:30.297783 , work_lng:-97.753880}
      ]);
    });
};

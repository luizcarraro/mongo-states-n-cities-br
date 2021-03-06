let conecta = require('./connectDB.js'),
    conectaBanco= conecta.retornaConexao()
    Promise   = require('bluebird'),
    Schema    = conectaBanco.Schema,
    _         =  require('lodash'),
    states    = require('./states');


var State = conectaBanco.model('State',{
  name: String,
  shortname: String
});

var City = conectaBanco.model('City', {
  name: String,
  state: { type: Schema.Types.ObjectId, ref: 'State' }
});

_.each(states, function (state) {
  console.log('Criando Estado ', state.name, ' com ', state.cities.length, ' cidades.');
  return State.create(state, function (err, savedState) {
    if(err) return console.log(err);

    console.log('Created -> ', savedState.name);

    _.each(state.cities, function (city) {
      return City.create( _.extend(city, { state: savedState._id }), function (err, savedCity) {
        if(err) return console.log(err);
        // console.log('   Created -> ', savedCity.name);
      });
    });
  });
});


// _.each(states, function (state) {
//   console.log('Listed -> ', state.name);
//     // _.each(state.cities, function (city) {
//       // console.log('   Listed -> ', city.name);
//     // });
// });

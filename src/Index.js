const app = require('./app');
require('./database')

//Podemos usar esto en vez del app.listen
async function init(){
   await app.listen(3000);
   console.log('server on port 3000')
}


init();
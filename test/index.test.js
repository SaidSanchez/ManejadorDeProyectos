const supertest=require ('supertest');
const app=require('../app');

//sentencia
describe("Probar el sistema de autenticacion."()=>{
  //Casos de prueba => 50%
  it('Deberia de obtener un login con usuario y contraseña correcto',(done)=>{
    supertest(app).post('/login')
    .send({'email':'a307730@uach.mx','password':'123abc'})
    .expect(200)
    .end(function (err,res){
      if(err){
        done(err);
      }else{
      done();
      }
    });
  });
});

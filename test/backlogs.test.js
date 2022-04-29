const supertest=require ('supertest');

const app=require('../app');

//sentencia
describe("Probar el sistema de id."()=>{
  //Casos de prueba => 50%
  it('Deberia de obtener un id del backlog correcto',(done)=>{
    supertest(app).post('/')
    .send({'id':'1'})
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

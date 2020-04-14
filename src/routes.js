const express=require('express')
const ongController=require('./controller/ongController');
const incedentsController=require('./controller/IncedentsController');
const profileController =require('./controller/ProfileController');
const sessionController =require('./controller/SessionController');

const routes=express.Router()


routes.post('/session',sessionController.create);
routes.get('/ongs',ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents',incedentsController.index);
routes.post('/incidents', incedentsController.create);
routes.delete('/incidents/:id', incedentsController.delete);

routes.get('/profile', profileController.index);

module.exports=routes;
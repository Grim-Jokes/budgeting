import { Router } from 'express';

export var router = Router();

/* GET users listing. */
router.get('/', function(_req, res,_next) {
  res.json({users: [{name: 'Timmy'}]});
});


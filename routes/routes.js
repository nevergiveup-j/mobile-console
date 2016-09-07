import express, {Router} from 'express';

import imageControllers from '../controllers/image';
import logControllers from '../controllers/log';

const router = Router();

router.get('/', (req,res) => {
	res.render('index', {
			pageTitle: 'Index'
	})
});

router.get('/:id', (req,res) => {
  new logControllers(req, res);

  res.render('log', {
		pageTitle: 'Log'
	})
});

router.get('/log.gif', (req,res) => {
  new imageControllers(req, res);

  res.set('Content-Type', 'image/gif');
  res.send('');

  // console.log(req);
  // console.log(res);
});

export default router;
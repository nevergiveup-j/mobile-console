import express, {Router} from 'express';

import logControllers from '../controllers/log'

const router = Router();

router.get('/', (req,res) => {
	res.render('index', {
			pageTitle: 'Index'
	})
});

router.get('/log', (req,res) => {
  res.render('log', {
		pageTitle: 'Log'
	})
});

router.get('/log.gif', (req,res) => {
  new logControllers(req, res);

  res.set('Content-Type', 'image/gif');
  res.send('');

  // console.log(req);
  // console.log(res);
});

export default router;
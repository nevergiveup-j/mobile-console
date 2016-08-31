import express, {Router} from 'express';

const router = Router();

router.get('/', (req,res) => {
	res.render('index', {
			pageTitle : '首页'
	})
});

router.get('/log', (req,res) => {
  res.render('log', {
		pageTitle : 'Log'
	})
});

export default router;
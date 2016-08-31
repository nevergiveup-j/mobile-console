import express, {Router} from 'express';

// var user = require(process.cwd() +  '/models/user');
// var regVerify = require(process.cwd() + '/models/regVerify');

const router = Router();

router.get('/', function (req, res) {
	res.render('index',
		{
			pageTitle : '首页',
			// success: req.flash('success').toString()
		}
	)
});

router.get('/log', function (req, res) {
  res.render('log',
  	{
		pageTitle : 'Log',
		// error: req.flash('error').toString()
	}
  )
});

// router.post('/login', function(req, res) {
// 	var email = req.body.email.trim();
// 	var password = req.body.password.trim();

// 	if(!email.length || !password.length) {
// 		req.flash('error', '不能为空!');

// 		return res.redirect('/login');
// 	}

// 	var md5 = crypto.createHash('md5');

// 	password = md5.update(password).digest('hex');

// 	user.get(email, function(err, user) {
// 		if(!user) {
// 			req.flash('error', '邮箱不存在!');
// 			return res.redirect('/login');
// 		}

// 		if(password != user.password) {
// 			req.flash('error', '密码错误!');
// 			return res.redirect('/login');
// 		}

// 		req.session.user = user;
// 		req.flash('success', '登录成功！');
// 		res.redirect('/');
// 	})

// });

// router.get('/reg', isLoggedIn, function(req, res) {
// 	res.render('reg',
// 		{
// 			pageTitle : '注册',
// 			error: req.flash('error').toString()
// 		}
// 	)
// });

// router.post('/reg', function(req, res) {
// 	new regVerify(req, res);
// });

// router.get('/logout', function(req, res) {
// 	req.session.user = null;

// 	res.render('logout',
// 		{
// 			pageTitle : '登出',
// 			success: '登出成功！'
// 		}
// 	)
// });

// router.get('/profile', function(req, res) {
// 	res.render('profile',
// 		{ pageTitle : 'profile' }
// 	)
// });

// // 404/500
// router.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// router.use(function(err, req, res, next) {
// 	res.status(err.status || 500);
// 	res.render('error', {
// 		pageTitle: 'error',
// 		message: err.message,
// 		error: {}
// 	});
// });


function isLoggedIn(req, res, next) {
	console.log(req.session);

	if (!req.session.user)
		return next();

	res.redirect('/');
}

export default router;
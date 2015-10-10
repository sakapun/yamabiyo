var cli = require('cheerio-httpcli');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/search/', function(req, res){
	var pref = '15';
	var mount = '';
	if(req.query.mount){
		mount = req.query.mount;
		cli.fetch('http://tenkura.n-kishou.co.jp/tk/kanko/kad.html', { code: mount, type: '15', ba: 'hr' }, function (err, $, result, body) {
			if(err){
				res.status('403');
				res.send('the mountain is not defined' + err);
			} else {
				var gotHtml = $(".kad_tbl2").eq(2).find("tr.t_w.mnt_td").html();
				if(gotHtml){
					var tomorrow = $(".kad_tbl2").eq(1).find("tr.t_w.mnt_td td").eq(4).clone();
					res.status('200');
					res.send(tomorrow + gotHtml );
				} else {
					res.status('403');
					console.log(req.query.mount);
				}
			}
		})
	} else {
		res.status('403');
		res.send('mount is required');
	}
});
app.listen(process.env.PORT || 3000);
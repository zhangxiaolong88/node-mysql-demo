var utils = require("../../../util/utils").utils,
	dbPool = require("../../../db/dbPool").dbPoolObj.dbPool,
	dbOperator = require("../../../db/dbOperation");

exports.getGames = function(req, res) {
	var pageCount = req.query.pageCount,
		currentPage = req.query.currentPage,
		filterName = req.query.filterName,
		filterContent = req.query.filterContent,
		sName = req.query.sortName,
		sDesc = req.query.sortDesc === "true" ? "desc" : "asc";

	var sqlstr = "select * from game",
		params = [];
	if (typeof filterName != "undefined" && filterName != "" && typeof filterContent != "undefined" && filterContent != "") {
		sqlstr += " where ? like '%?%'";
		params.push(filterName, filterContent);
	}
	sqlstr += " order by ?";
	params.push({
		sortName: sName,
		sortDesc: sDesc
	});

	dbOperator.query(dbPool, sqlstr, params, function(err, datas) {
		var games = [];
		for (var i = 0, l = datas.length; i < l; i++) {
			var data = datas[i],
				game = {};
			if (data.GAME_ID !== "NULL") {
				game.id = data.GAME_ID
			}
			if (data.GAME_NAME !== "NULL") {
				game.name = data.GAME_NAME
			}
			if (data.GAME_DESC !== "NULL") {
				game.desc = data.GAME_DESC
			}
			games.push(game);
		}

		res.send({
			state: 1,
			data: {
				totalCount: games.length,
				games: utils.getPageData(games, currentPage, pageCount)
			}
		});
	});

};

exports.addGame = function(req, res) {

};

exports.updateGame = function(req, res) {

};

exports.deleteGames = function(req, res) {

};
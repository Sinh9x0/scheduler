var moment = require('moment');
moment().format();

module.exports = (function() {
	return {
		availableShifts: function(req, res) {
			var query = "SELECT * FROM shifts where user.id = null";
			connection.query(query, function (err, rows){
				if (err) 
					res.json(err)
				else
					res.json(rows)
			})
		},

		employeeShift: function(req, res){
			var query = connection.query("select * from employees where id = ?", req.params.id, function(err, records){					
				if (err){
					res.json(err);
				} else {
					res.json(records);
				}
			});
		},

		getCategories: function(req, res){
			var query = connection.query("select * from categories", function(err, records){					
				if (err){
					res.json(err);
				} else {
					res.json(records);
				}
			});
		},

		addShift: function(req, res) {
			var startTime = moment(req.body.start).format("HH:mm:ss");
			var endTime = moment(req.body.end).format("HH:mm:ss");

			var post = {
				day: req.body.day, 
				category_id: req.body.category,
				location_id: req.body.location, 
				start_time: startTime,
				end_time: endTime,
				created_at: (new Date()).toISOString().substring(0, 19).replace('T', ' '), 
				updated_at: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
			}

			var query = connection.query('INSERT INTO shifts SET ?', post, function(err, result) {
				return res.json(result.insertId);
			});			
		}
	}

})();
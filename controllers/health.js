/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
	res.render('healthservice', {
		title: 'Health Services'
	});
};

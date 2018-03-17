/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('usertype', {
    title: 'User Type'
  });
};

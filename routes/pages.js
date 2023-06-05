const express = require('express');
const router = express.Router();
// get pages model 
const Page = require('../models/page');


//get
router.get('/', function(req, res) {
    res.render('index', {
        title: 'HomeFarm'
    });
});

//get a page
router.get('/:slug', function (req, res) {

    var slug = req.params.slug;

    Page.findOne({ slug: slug }, function (err, page) {
        if (err)
            console.log(err);
        if (!page) {
            res.redirect('/');

        } else {
            res.render('index', {
                title: page.title,
                content: page.content
            });

        }
    });

});


//export
module.exports = router;
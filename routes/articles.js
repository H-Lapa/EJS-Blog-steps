const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    //this is render a new blank instead of one prefilled with failed article
    res.render('articles/new', {article: new Article()})
})

router.get('/:id', (req, res) => {
    //getting the id from the url
    res.send(req.params.id);
})

router.post('/', async(req, res) => {
    // accessing the html body to make Article row
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown

    })

    try {
        //waiting to save article before rendering
        article = await article.save()
        //loads the article made, With its ID
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        //else Stays on page passing through article to pass through the previous details
        //render failed article
        res.render('articles/new', {article: article})
    }
    
})

module.exports = router
import express  from 'express';
import dateFormat  from 'dateformat';

const router = express.Router();
const Article = require('../models').Article;


function publishedAt() {
	return dateFormat(this.createdAt, 'dddd, mmmm dS, yyyy, h:MM TT');
}

function shortDescription(){ 
	return this.body.length > 30 ? this.body.substr(0, 30) + '...' : this.body;
}

const articles = [
	{
		id: 1,
		title: 'My First Blog Post',
		author: 'Andrew Chalkley',
		body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu fermentum metus. Sed blandit at sapien sed porttitor. Curabitur libero velit, blandit vel est ut, cursus aliquam augue. Vivamus aliquam, lorem id lobortis blandit, sem quam gravida nibh, a pulvinar nulla lacus eget tortor. Suspendisse cursus, eros non auctor interdum, quam metus sollicitudin est, nec consequat massa nisi sed purus. Aliquam pellentesque sagittis risus vitae porttitor. In dignissim, enim eget pulvinar semper, magna justo vulputate justo, vitae volutpat sapien dolor eget arcu. Mauris ornare ipsum in est molestie pretium. Pellentesque at nulla at libero sagittis condimentum. Pellentesque tempor quis neque eget aliquam. Curabitur facilisis ultricies erat quis sagittis. Sed eu malesuada neque. Donec tempor dignissim urna, eu efficitur felis porttitor quis.',
		publishedAt: publishedAt,
		shortDescription: shortDescription
	},
	{
		id: 2,
		title: 'My Second Blog Post',
		author: 'Andrew Chalkley',
		body: 'Lorem ipsum dolor sit amet, adipiscing elit. Sed eu fermentum metus. Sed blandit at sapien sed porttitor. Curabitur libero velit, blandit vel est ut, cursus aliquam augue. Vivamus aliquam, lorem id lobortis blandit, sem quam gravida nibh, a pulvinar nulla lacus eget tortor. Suspendisse cursus, eros non auctor interdum, quam metus sollicitudin est, nec consequat massa nisi sed purus. Aliquam pellentesque sagittis risus vitae porttitor. In dignissim, enim eget pulvinar semper, magna justo vulputate justo, vitae volutpat sapien dolor eget arcu. Mauris ornare ipsum in est molestie pretium. Pellentesque at nulla at libero sagittis condimentum. Pellentesque tempor quis neque eget aliquam. Curabitur facilisis ultricies erat quis sagittis. Sed eu malesuada neque. Donec tempor dignissim urna, eu efficitur felis porttitor quis.',
		publishedAt: publishedAt,
		shortDescription: shortDescription
	}
];


function find(id) {
	const matchedArticles = articles.filter(function(article) { return article.id == id; });
	return matchedArticles[0];
}


/* GET articles listing. */
router.get('/', (req, res, next)  => {
	res.render('articles/index', { articles, title: 'My Awesome Blog' });
});

/* POST create article. */
router.post('/', (req, res, next)  => {
	Article.create(req.body).then((article) => {
		res.redirect(`/articles/${article.id}`);
	});
});

/* Create a new article form. */
router.get('/new', (req, res, next)  => {
	res.render('articles/new', { article: Article.build(), title: 'New Article' });
});

/* Edit article form. */
router.get('/:id/edit', (req, res, next) => {
	const article = find(req.params.id);

	res.render('articles/edit', { article, title: 'Edit Article' });
});


/* Delete article form. */
router.get('/:id/delete', (req, res, next) => {
	const article = find(req.params.id);

	res.render('articles/delete', { article, title: 'Delete Article' });
});


/* GET individual article. */
router.get('/:id', (req, res, next) => {
	const article = find(req.params.id);

	res.render('articles/show', { article, title: article.title });
});

/* PUT update article. */
router.put('/:id', (req, res, next) => {
	const article = find(req.params.id);
	article.title = req.body.title;
	article.body = req.body.body;
	article.author = req.body.author;

	res.redirect(`/articles/${article.id}`);
});

/* DELETE individual article. */
router.delete('/:id', (req, res, next) => {
	const article = find(req.params.id);
	const index = articles.indexOf(article);
	articles.splice(index, 1);

	res.redirect('/articles');
});


module.exports = router;

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const stylesheet =
	'http://gutenberg.local/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,common,forms,admin-menu,dashboard,list-tables,edit,revisions,media,themes,about,nav-menus,wp-pointer,widgets&load%5Bchunk_1%5D=,site-icon,l10n,buttons,wp-auth-check&ver=5.3-RC3-46619';

app.get('/style.css', (req, res) => {
	const config = {
		headers: { 'Access-Control-Allow-Origin': '*' },
	};
	axios.get(stylesheet, config).then(response => {
		res.send(response.data);
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import React, { useEffect } from 'react';
import expand from 'emmet';

import { useAppContext } from './context';

export function HtmlRenderer(props) {
	const { selector } = useAppContext();

	const rawHTML = expandSelector(selector);

	return (
		<div>
			<br />
			<div dangerouslySetInnerHTML={{ __html: rawHTML }} />
		</div>
	);
}

function expandSelector(selector) {
	try {
		return expand(selector.replace(/ (?![^{]*})/g, '>'));
	} catch (err) {
		return '';
	}
}

export default HtmlRenderer;

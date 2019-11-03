import React, { useEffect } from 'react';
import { useAppContext } from './context';
import { useFrameContext } from './frame';
import beautify from 'js-beautify';

function getMatchedCSSRules(el, css = el.ownerDocument.styleSheets) {
	return []
		.concat(...[...css].map(s => [...(s.cssRules || [])]))
		.filter(r => el.matches(r.selectorText));
}

function getMatchedCSSRulesAsString(el, css = el.ownerDocument.styleSheets) {
	const rules = getMatchedCSSRules(el, css);

	return rules.map(set => set.cssText).join('\n');
}

export function Analyzer() {
	const {
		rules,
		setRules,
		frameDocument,
		selector,
		styleSheets,
	} = useAppContext();
	const frameCtx = useFrameContext();

	useEffect(() => {
		try {
			const node = frameDocument.querySelector(selector);
			setRules(getMatchedCSSRulesAsString(node));
		} catch (err) {}
	}, [frameDocument, selector, setRules]);

	return (
		<div>
			<pre>{beautify.css(rules)}</pre>
		</div>
	);
}

export default Analyzer;

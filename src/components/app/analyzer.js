import React, { useEffect } from 'react';
import { useAppContext } from './context';
import { useFrameContext } from './frame';
import beautify from 'js-beautify';

function getMatchedCSSRules(el, css = el.ownerDocument.styleSheets) {
	return []
		.concat(...[...css].map(s => [...(s.cssRules || [])]))
		.filter(r => el.matches(r.selectorText));
}

function getMatchedCSSRulesAsData(el, css = el.ownerDocument.styleSheets) {
	const rules = getMatchedCSSRules(el, css);
	const checkPropValues = createCheckCssRuleProps(el);

	return rules.map(cssRule => {
		const { selectorText } = cssRule;
		const propValues = checkPropValues(getCssRuleProps(cssRule));

		return {
			selectorText: selectorText.replace(/, /g, ',\n'),
			propValues,
		};
	});
}

function getMatchedCSSRulesAsString(el, css = el.ownerDocument.styleSheets) {
	const rules = getMatchedCSSRules(el, css);

	return rules
		.map(set => {
			getCssRuleProps(set);
			return set.cssText;
		})
		.join('\n');
}

export function CssRule(cssRule) {
	const { selectorText, propValues } = cssRule;

	return (
		<>
			<pre>
				{selectorText}
				{' {'}
			</pre>
			{propValues.map(propValue => {
				const { isActive, prop, value } = propValue;

				if (!isActive) {
					console.log(prop, value);
					return (
						<pre
							key={prop}
							style={{
								textDecoration: 'line-through',
								marginLeft: 20,
							}}
						>{`${prop}: ${value};`}</pre>
					);
				}

				return (
					<pre
						key={prop}
						style={{ marginLeft: 20 }}
					>{`${prop}: ${value};`}</pre>
				);
			})}
			<pre>{'}'}</pre>
			<br />
		</>
	);
}

export function Analyzer() {
	const {
		setRules,
		frameDocument,
		selector,
		setRulesData,
		rulesData,
	} = useAppContext();

	useEffect(() => {
		try {
			const node = frameDocument.querySelector(selector);
			setRules(getMatchedCSSRulesAsString(node));
			setRulesData(getMatchedCSSRulesAsData(node));
		} catch (err) {}
	}, [frameDocument, selector, setRules, setRulesData]);

	if (!rulesData) return null;

	return (
		<div>
			{rulesData.map(rule => (
				<CssRule {...rule} key={rule.selectorText} />
			))}
		</div>
	);
}

function getCssRuleProps(cssRule = '') {
	const [match] = cssRule.cssText.match(/\{([^}]+)\}/g);
	const matchString = match
		.replace('{ ', '')
		.replace(' }', '')
		.replace(/: /g, ':')
		.replace(/; /g, ';');

	const propValues = matchString
		.split(';')
		.filter(Boolean)
		.map(propValue => {
			const [prop, value] = propValue.split(':');
			return {
				prop,
				value,
			};
		});

	return propValues;
}

function createCheckCssRuleProps(node) {
	const _window = node.ownerDocument.defaultView;
	const styles = _window.getComputedStyle(node);

	return propValues => {
		return propValues.map(propValue => {
			const { prop, value } = propValue;
			const isActive = styles[prop].includes(value);

			return {
				prop,
				value,
				isActive,
			};
		});
	};
}

export default Analyzer;

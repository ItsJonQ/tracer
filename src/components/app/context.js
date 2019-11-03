import React, { createContext, useContext, useState } from 'react';

export const initialState = {
	selector: '',
	stylesheet: '',
};

export const AppContext = createContext(initialState);
export const useAppContext = () => useContext(AppContext);

export const AppProvider = props => {
	const [selector, setSelector] = useState(initialState.selector);
	const [stylesheet, setStylesheet] = useState(initialState.stylesheet);
	const [rules, setRules] = useState('');
	const [rulesData, setRulesData] = useState(null);
	const [frameDocument, setFrameDocument] = useState(null);

	const { children } = props;
	const { Provider } = AppContext;

	const appContext = useAppContext();

	const contextProps = {
		...appContext,
		selector,
		setSelector,
		stylesheet,
		setStylesheet,
		frameDocument,
		setFrameDocument,
		rules,
		setRules,
		rulesData,
		setRulesData,
	};

	return (
		<Provider value={contextProps}>
			<>{children}</>
		</Provider>
	);
};

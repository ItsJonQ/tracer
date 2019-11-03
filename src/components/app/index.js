import React from 'react';
import { AppProvider } from './context';
import Frame from './frame';
import HtmlRenderer from './html-renderer';
import SeletorInput from './selector-input';
import Uploader from './uploader';
import Analyzer from './analyzer';

export function App() {
	return (
		<AppProvider>
			<Uploader />
			<br />
			<SeletorInput />
			<br />
			<Frame>
				<HtmlRenderer />
			</Frame>
			<Analyzer />
		</AppProvider>
	);
}

export default App;

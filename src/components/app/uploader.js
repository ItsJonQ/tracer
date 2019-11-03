import React from 'react';
import { useAppContext } from './context';

export function Uploader() {
	const { setStylesheet } = useAppContext();
	const handleOnChange = event => {
		const reader = new FileReader();
		reader.readAsText(event.target.files[0]);
		reader.onload = function(e) {
			setStylesheet(e.target.result);
		};
	};

	return <input type="file" onChange={handleOnChange} />;
}

export default Uploader;

import React from 'react';
import styled from 'styled-components';
import { useAppContext } from './context';

export function SelectorInput() {
	const { selector, setSelector } = useAppContext();

	const handleOnChange = event => {
		const {
			target: { value },
		} = event;
		setSelector(value);
	};

	return <Input type="text" value={selector} onChange={handleOnChange} />;
}

const Input = styled.input`
	font-size: 21px;
	padding: 10px;
	width: 100%;
	display: block;
`;

export default SelectorInput;

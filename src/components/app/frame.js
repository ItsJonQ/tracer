import React, { useEffect, useContext } from 'react';
import BaseFrame, { FrameContext } from 'react-frame-component';
import { useAppContext } from './context';

export const useFrameContext = () => useContext(FrameContext);

function FramePropagator() {
	const { frameDocument, setFrameDocument } = useAppContext();
	const frameCtx = useFrameContext();
	const ctxDocument = frameCtx.document || null;

	useEffect(() => {
		if (frameDocument !== ctxDocument) {
			setFrameDocument(ctxDocument);
		}
	}, [frameDocument, ctxDocument, setFrameDocument]);

	return null;
}

export function Frame(props) {
	const { stylesheet } = useAppContext();
	const { children } = props;

	return (
		<BaseFrame style={{ border: 0, display: 'none' }}>
			<>
				<FramePropagator />
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				{children}
			</>
		</BaseFrame>
	);
}

export default Frame;

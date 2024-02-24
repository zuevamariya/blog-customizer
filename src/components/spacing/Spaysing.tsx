import { ReactNode } from 'react';

type SpacingProps = {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
	children: ReactNode;
};

export const Spacing = ({
	top,
	right,
	bottom,
	left,
	children,
}: SpacingProps) => {
	const style = {
		marginTop: top,
		marginRight: right,
		marginBottom: bottom,
		marginLeft: left,
	};

	return <div style={style}>{children}</div>;
};

import { Text } from 'components/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: 'submit' | 'reset';
}) => {
	return (
		<button className={`${styles.button} ${type === 'submit' ? styles.buttonSubmit : styles.buttonReset}`} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};

import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (isOpen: boolean) => void;

export const ArrowButton = ({ isOpen, onClick }: { isOpen: boolean, onClick: OnClick }) => {
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		onClick(!isOpen);
		event.stopPropagation();
	}
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.containerOpen : ''}`}
			onClick={handleClick}>
			<img src={arrow} alt='иконка стрелочки' className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} />
		</div>
	);
};

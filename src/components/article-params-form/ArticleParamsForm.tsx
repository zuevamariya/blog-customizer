import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { fontFamilyOptions } from 'src/constants/articleProps';


import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, useEffect } from 'react';

export const ArticleParamsForm = () => {
	const [isContainerOpen, setIsContainerOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [selectedFontFamily, setSelectedFontFamily] = useState(fontFamilyOptions[0]);

	const handleArrowButtonClick = () => {
		setIsContainerOpen(!isContainerOpen);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (!containerRef.current?.contains(event.target as Node)) {
			setIsContainerOpen(false);
		}
	};

	useEffect(() => {
		if (isContainerOpen) {
			document.addEventListener('click', handleOutsideClick);

			return () => {
				document.removeEventListener('click', handleOutsideClick);
			};
		}
	}, [isContainerOpen]);

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isContainerOpen} onClick={handleArrowButtonClick} />
			<aside className={`${styles.container} ${isContainerOpen ? styles.containerOpen : ''}`}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>{'Задайте параметры'}</Text>				
					<Select 
						selected={selectedFontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) => setSelectedFontFamily(selectedOption)}
						title='шрифт'/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};

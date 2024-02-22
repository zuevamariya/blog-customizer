import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, defaultArticleState } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';


import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, useEffect } from 'react';
import { Separator } from '../separator';

export const ArticleParamsForm = () => {

	const [isContainerOpen, setIsContainerOpen] = useState<boolean>(false);
	const [isForm, setIsForm] = useState(defaultArticleState);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleArrowButtonClick = () => {
		setIsContainerOpen(!isContainerOpen);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
						selected={isForm.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(fontFamily) => setIsForm({...isForm, fontFamilyOption: fontFamily})}
						title='шрифт'/>
					<RadioGroup 
						name=''
						options={fontSizeOptions}
						selected={isForm.fontSizeOption}
						onChange={(fontSize) => setIsForm({...isForm, fontSizeOption: fontSize})}
						title='размер шрифта'/>
					<Select 
						selected={isForm.fontColor}
						options={fontColors}
						onChange={(fontColor) => setIsForm({...isForm, fontColor: fontColor})}
						title='цвет шрифта'/>
					<Separator />					
					<Select 
						selected={isForm.backgroundColor}
						options={backgroundColors}
						onChange={(background) => setIsForm({...isForm, backgroundColor: background})}
						title='цвет фона'/>
					<Select 
						selected={isForm.contentWidth}
						options={contentWidthArr}
						onChange={(content) => setIsForm({...isForm, contentWidth: content})}
						title='ширина контента'/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};

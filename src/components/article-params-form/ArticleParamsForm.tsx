import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	setArticleParams: Dispatch<SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
	}>>;
};

export const ArticleParamsForm = ({setArticleParams}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [isForm, setIsForm] = useState(defaultArticleState);
	const containerRef = useRef<HTMLFormElement | null>(null);

	//Открытие/закрытие кнопкой-стрелкой
	const handleArrowButtonClick = (isOpen: boolean) => {
		setIsFormOpen(isOpen);
	};

	//Закрытие кликом по оверлею
	const handleOutsideClick = (event: MouseEvent) => {
		const test =
			containerRef.current &&
			event.composedPath().includes(containerRef.current);
		if (event.target != containerRef.current && !test) {
			setIsFormOpen(false);
		}
	};

	//Обновление данных страницы, с учетом указанных значений в форме, при ее отправке(submit)
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArticleParams(isForm);
		setIsFormOpen(false);
	};

	//Данные страницы и формы скинуты до дефолтных значений(reset)
	const handleReset = () => {
		setIsForm(defaultArticleState);
		setArticleParams(defaultArticleState);
		setIsFormOpen(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div>
			<ArrowButton isOpen={isFormOpen} onClick={handleArrowButtonClick} />
			<aside
				className={`${styles.container} ${
					isFormOpen ? styles.containerOpen : ''
				}`}>
				<form className={styles.form} ref={containerRef} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={isForm.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(fontFamily) =>
							setIsForm({ ...isForm, fontFamilyOption: fontFamily })
						}
						title='шрифт'
					/>
					<RadioGroup
						name=''
						options={fontSizeOptions}
						selected={isForm.fontSizeOption}
						onChange={(fontSize) =>
							setIsForm({ ...isForm, fontSizeOption: fontSize })
						}
						title='размер шрифта'
					/>
					<Select
						selected={isForm.fontColor}
						options={fontColors}
						onChange={(fontColor) =>
							setIsForm({ ...isForm, fontColor: fontColor })
						}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={isForm.backgroundColor}
						options={backgroundColors}
						onChange={(background) =>
							setIsForm({ ...isForm, backgroundColor: background })
						}
						title='цвет фона'
					/>
					<Select
						selected={isForm.contentWidth}
						options={contentWidthArr}
						onChange={(content) =>
							setIsForm({ ...isForm, contentWidth: content })
						}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};

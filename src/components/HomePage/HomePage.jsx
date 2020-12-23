import React, { useEffect } from 'react';
import { ReactComponent as Image } from '../../images/budget.svg'
import { HomePageWrapper, Title, ImageWrapper, Footer } from './Homepage.css'
import { useTranslation } from 'react-i18next';

import { ImageAnimations } from './ImageAnimations'

const HomePage = () => {

    const { t } = useTranslation();

    useEffect(() => {
        ImageAnimations()
    }, [])

    return (
        <HomePageWrapper>
            <Title>
                { t('Budget App') }
            </Title>
            <ImageWrapper>
                <Image />
            </ImageWrapper>
        </HomePageWrapper>
    );
}

export default HomePage;
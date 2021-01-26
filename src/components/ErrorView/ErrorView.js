import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

import { ReactComponent as ErrorImage } from '../../images/server_down.svg';
import styled from 'styled-components';

const ErrorPageWrapper = styled.div`
  width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
`;

const ErrorTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.red.normal};
  background: ${({ theme }) => theme.colors.gray.light};
  text-align: center;
  font-size: ${({ theme }) => theme.spacing.xs - 2.5}vh;
  border-radius: 0 0 20px 20px;
`;

const ErrorAnimations = () => {
  const timeLine = gsap.timeline();

  timeLine.from('#littleBoy', { y: -100, duration: 0.5 });
  timeLine.from('#computer', { x: 100, opacity: 0, duration: 0.5 });
  timeLine.to(
    '#circle',
    { scale: 0.8, repeat: -1, yoyo: true, duration: 5 },
    'start'
  );
  timeLine.to(
    '#hand',
    { rotate: -10, repeat: -1, yoyo: true, duration: 1 },
    'start'
  );
};

const ErrorView = () => {
  const { t } = useTranslation();

  useEffect(() => {
    ErrorAnimations();
  }, []);

  return (
    <ErrorPageWrapper>
      <div>
        <ErrorImage
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <ErrorTitle>{t('Ooops, something went wrong!')}</ErrorTitle>
    </ErrorPageWrapper>
  );
};

export default ErrorView;

import Lottie from 'react-lottie';
import { useAppSelector } from '../../Hooks/app.hook';
import loading from './loader.json';
import style from './loading.module.css';

const Loading = () => {
  const { active } = useAppSelector((state) => state.loader);

  const options = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    speed: 0.1,
  };
  return (
    <>
      {active && (
        <>
          <div className={style['loading-container']}></div>
          <div className={style['loading-contents']}>
            <Lottie isClickToPauseDisabled={true} options={options} width="400px" height="400px" speed={1.5} />
          </div>
        </>
      )}
    </>
  );
};

export default Loading;

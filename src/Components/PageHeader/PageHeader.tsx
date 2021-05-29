import style from './pageheader.module.css';
import PageHeaderRouter from '../../Route/PageHeader';

const PageHeader = () => {
  return (
    <div className={style['page-header']}>
      <div>
        <PageHeaderRouter />
      </div>
    </div>
  );
};

export default PageHeader;

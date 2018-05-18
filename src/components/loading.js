import React from 'react';
import PropTypes from 'prop-types';

import styles from './loading.scss';

const Loading = ({ data }) =>
  data.loading
    ? <div className={styles.loading}>loading data</div>
    : <div className={styles.error}>error trying to fetch data</div>;

Loading.propTypes = {
  data: PropTypes.object.isRequired
};

export default Loading;
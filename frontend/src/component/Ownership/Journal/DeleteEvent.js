import React from 'react';
import { withRouter } from 'react-router-dom';

function DeleteJournal({ history }) {
  return <div>{history.push('/journal')}</div>;
}

export default withRouter(DeleteJournal);

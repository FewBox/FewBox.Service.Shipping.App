import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface IComingSoonPageProps {
}

class ComingSoonPage extends React.Component<IComingSoonPageProps, any> {
  render() {
    return (
      <div>
          <FormattedMessage id='Label.ComingSoon' />
      </div>
    );
  }
}

export default ComingSoonPage;
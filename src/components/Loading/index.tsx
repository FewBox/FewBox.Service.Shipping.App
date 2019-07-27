import * as React from 'react';
import './style.scss';

export interface ILoadingProps {
    isVisable: boolean;
}

export default class Loading extends React.PureComponent<ILoadingProps> {
    public render() {
        let className = 'no-loading';
        if (this.props.isVisable) {
            className = 'loading';
        }
        return (
            <div className={className}>
                <div className='icon'></div>
            </div>
        );
    }
}

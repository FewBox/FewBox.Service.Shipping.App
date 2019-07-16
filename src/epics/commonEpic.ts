import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { changeLanguage } from '../actions';

const changeLanguageEric = (action$: ActionsObservable<any>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_LANGUAGE),
        map((action) => {
            return changeLanguage(action.lang);
        })
    );


export default [changeLanguageEric];
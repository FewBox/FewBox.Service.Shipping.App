import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { changeLanguage } from '../actions';
var changeLanguageEric = function (action$) {
    return action$.pipe(ofType(ActionTypes.CHANGE_LANGUAGE), map(function (action) {
        return changeLanguage(action.lang);
    }));
};
export default [changeLanguageEric];
//# sourceMappingURL=commonEpic.js.map
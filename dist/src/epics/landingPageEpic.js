import { ofType } from 'redux-observable';
import { of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { loadLandingPage } from '../actions';
// Todo: Need to be removed
import { landingPage } from '../jsons';
var initLandingPageEric = function (action$, store$) {
    return action$.pipe(ofType(ActionTypes.INIT_LANDINGPAGE), switchMap(function () {
        //return AjaxObservable({ path: '/api/dashboard', method: 'GET' }, store);
        return of(landingPage);
    }), map(function (response) {
        //return loadLandingPage(response.value.payload);
        return loadLandingPage(response.contributors);
    }));
};
export default [initLandingPageEric];
//# sourceMappingURL=landingPageEpic.js.map
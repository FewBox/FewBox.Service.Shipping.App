import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { zip } from 'rxjs';
import { mergeMap, map, switchMap, catchError, endWith, startWith } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import { Store } from '../reducers/State';
import AjaxObservable from '../fetch/AjaxObservable';
import { initDestinationRulePage, loadDestinationRule, fillDestinationRuleServiceDropdownList, fillDestinationRuleDeploymentDropdownList, fillSelectedDestinationRuleDeploymentDropdownList, beginLoading, endLoading } from '../actions';

const initDestinationRulePageEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DESTINATIONRULE_PAGE),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/destinationrules/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/destinationrules', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadDestinationRule(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const switchDestinationRuleEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SWITCH_FEWBOXDELIVERY),
        mergeMap((action) => {
            if (store$.value.settingPage.isFewBoxDelivery) {
                return new AjaxObservable({ path: '/api/destinationrules/fewbox', method: 'GET' });
            }
            else {
                return new AjaxObservable({ path: '/api/destinationrules', method: 'GET' });
            }
        }),
        map((payload) => {
            return loadDestinationRule(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const createDestinationRuleEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CREATE_DESTINATIONRULE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/destinationrules', method: 'POST', body: action.value });
        }),
        map((payload) => {
            return initDestinationRulePage();
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const deleteDestinationRuleEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.DELETE_DESTINATIONRULE),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/destinationrules/' + action.value.namespace + '/' + action.value.name, method: 'DELETE' });
        }),
        map((payload) => {
            return initDestinationRulePage();
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const changeDestinationRuleSubsetEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_DESTINATIONRULE_SUBSET),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/destinationrules/' + action.value.namespace + '/' + action.value.name, method: 'PATCH', body: [{ "op": "replace", "path": "/spec/subsets", "value": action.value.subsets }] });
        }),
        map((payload) => {
            return initDestinationRulePage();
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initServiceDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DESTINATIONRULE_SERVICE_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/namespaces/' + action.value + '/services', method: 'GET' });
        }),
        map((payload) => {
            return fillDestinationRuleServiceDropdownList(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const initDeploymentDropdownListEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST),
        mergeMap((action) => {
            return new AjaxObservable({ path: '/api/deployments?labels=app=' + action.value, method: 'GET' });
        }),
        map((payload) => {
            return fillDestinationRuleDeploymentDropdownList(payload);
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const selectDestinationRuleEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SELECT_DESTINATIONRULE),
        switchMap((action) => {
            return zip(new AjaxObservable({ path: '/api/namespaces/' + action.value.namespace + '/destinationrules/' + action.value.name, method: 'GET' }),
                new AjaxObservable({ path: '/api/deployments?labels=app=' + action.value.name, method: 'GET' }));
        }),
        map((payloads) => {
            return fillSelectedDestinationRuleDeploymentDropdownList({ subsets: payloads[0].subsets, deployments: payloads[1] });
        }),
        startWith(beginLoading()),
        endWith(endLoading()),
        catchError((errorAction) => {
            return errorAction;
        })
    );

export default [initDestinationRulePageEpic, createDestinationRuleEpic, switchDestinationRuleEpic, deleteDestinationRuleEpic, initServiceDropdownListEpic, initDeploymentDropdownListEpic, selectDestinationRuleEpic, changeDestinationRuleSubsetEpic];
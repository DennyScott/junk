import { Action, createAction } from 'actions';

export const CLICK_ICON = 'junk/desktop-actions/CLICK_ICON';

export function reducer(state: object = {}, action: Actions) {
    switch (action.type) {
        default:
            return state;
    }
}

type ClickIconAction = Action<typeof CLICK_ICON, number>;

export function clickIcon(id: number) {
    return createAction(CLICK_ICON, id);
}

export type Actions = ClickIconAction;
export type Action<T, P> = {
    type: T;
    payload: P;
};

export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
    return { type, payload };
}
import * as Lodash from 'lodash';

export const createExpiredAt = (ttl: number = -1) => {
    if (ttl <= 0) {
        return -1;
    }

    return Lodash.now() + ttl * 1000;
}
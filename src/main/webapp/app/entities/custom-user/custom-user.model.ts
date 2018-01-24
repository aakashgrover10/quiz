import { BaseEntity } from './../../shared';

export class CustomUser implements BaseEntity {
    constructor(
        public id?: number,
        public password?: string,
        public enabled?: boolean,
        public userProfile?: BaseEntity,
        public position?: BaseEntity,
        public role?: BaseEntity,
    ) {
        this.enabled = false;
    }
}

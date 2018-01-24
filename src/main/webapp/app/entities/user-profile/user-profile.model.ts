import { BaseEntity } from './../../shared';

export class UserProfile implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public contact?: string,
        public domain?: string,
        public expLevel?: number,
        public customUser?: BaseEntity,
    ) {
    }
}

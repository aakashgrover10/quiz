import { BaseEntity } from './../../shared';

export class Position implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public domain?: string,
        public status?: string,
        public createdBy?: string,
        public createdOn?: any,
        public quizzes?: BaseEntity[],
    ) {
    }
}

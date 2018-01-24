import { BaseEntity } from './../../shared';

export class Result implements BaseEntity {
    constructor(
        public id?: number,
        public obtainedMarks?: string,
        public percentage?: number,
        public appearedOn?: string,
        public quiz?: BaseEntity,
    ) {
    }
}

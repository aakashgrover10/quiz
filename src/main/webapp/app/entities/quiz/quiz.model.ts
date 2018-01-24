import { BaseEntity } from './../../shared';

export class Quiz implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public status?: string,
        public marks?: string,
        public questionsNumber?: number,
        public complexity?: string,
        public position?: BaseEntity,
        public result?: BaseEntity,
        public questions?: BaseEntity[],
    ) {
    }
}

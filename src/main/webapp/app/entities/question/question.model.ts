import { BaseEntity } from './../../shared';

export class Question implements BaseEntity {
    constructor(
        public id?: number,
        public section?: string,
        public description?: string,
        public optionA?: string,
        public optionB?: string,
        public optionC?: string,
        public optionD?: string,
        public answer?: string,
        public marks?: string,
        public status?: string,
        public complexity?: string,
        public quiz?: BaseEntity,
    ) {
    }
}

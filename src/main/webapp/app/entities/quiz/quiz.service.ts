import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Quiz } from './quiz.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class QuizService {

    private resourceUrl =  SERVER_API_URL + 'api/quizzes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(quiz: Quiz): Observable<Quiz> {
        const copy = this.convert(quiz);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(quiz: Quiz): Observable<Quiz> {
        const copy = this.convert(quiz);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Quiz> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Quiz.
     */
    private convertItemFromServer(json: any): Quiz {
        const entity: Quiz = Object.assign(new Quiz(), json);
        entity.startDate = this.dateUtils
            .convertLocalDateFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertLocalDateFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a Quiz to a JSON which can be sent to the server.
     */
    private convert(quiz: Quiz): Quiz {
        const copy: Quiz = Object.assign({}, quiz);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(quiz.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(quiz.endDate);
        return copy;
    }
}

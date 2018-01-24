import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomUser } from './custom-user.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CustomUserService {

    private resourceUrl =  SERVER_API_URL + 'api/custom-users';

    constructor(private http: Http) { }

    create(customUser: CustomUser): Observable<CustomUser> {
        const copy = this.convert(customUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(customUser: CustomUser): Observable<CustomUser> {
        const copy = this.convert(customUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CustomUser> {
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
     * Convert a returned JSON object to CustomUser.
     */
    private convertItemFromServer(json: any): CustomUser {
        const entity: CustomUser = Object.assign(new CustomUser(), json);
        return entity;
    }

    /**
     * Convert a CustomUser to a JSON which can be sent to the server.
     */
    private convert(customUser: CustomUser): CustomUser {
        const copy: CustomUser = Object.assign({}, customUser);
        return copy;
    }
}

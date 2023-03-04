import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "./account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService) {
        
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req);

        // const idToken = this.accountService.getUserToken();

        // if (idToken) {
        //     const cloned = req.clone({
        //         headers: req.headers.set("Authorization",
        //             "Bearer " + idToken)
        //     });

        //     return next.handle(cloned);
        // }
        // else {
        //     return next.handle(req);
        // }
    }
}
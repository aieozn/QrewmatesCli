import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "./services/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService) {
        
    }

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const activeUser = this.accountService.getActiveUser();
        console.log(activeUser)

        if (activeUser) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + activeUser.token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, switchMap, tap } from "rxjs";
import { AccountService } from "./services/account.service";
import { TokenExpiredError } from "./token-expired-error";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService) {
        
    }

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        // Skip refresh token request
        if (req.url.endsWith('/refresh')) return next.handle(req);

        const activeUser = this.accountService.getUser();

        if (activeUser != null) {
            return of(activeUser).pipe(
                tap(e => {
                    if(e.tokenExpiration < new Date().getTime()) throw new TokenExpiredError();
                }),
                switchMap(activeUser => {
                    const cloned = req.clone({
                        headers: req.headers.set("Authorization",
                            "Bearer " + activeUser.token)
                    });

                    return next.handle(cloned);
                }),
                catchError(e => {
                    if (e instanceof TokenExpiredError || e.status === 401 || e.status == 403) {
                        // Refresh token and try once again
                        return this.accountService.refreshToken(activeUser).pipe(
                            switchMap(activeUser => {
                                const cloned = req.clone({
                                    headers: req.headers.set("Authorization",
                                        "Bearer " + activeUser.token)
                                });
            
                                return next.handle(cloned);
                            })
                        )
                    }

                    // TODO handle this exception
                    throw e; 
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
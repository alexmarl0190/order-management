import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { TokenService } from '../services/token.service'
import { Router } from '@angular/router'
import { catchError, switchMap, throwError } from 'rxjs'

let isRefreshing = false

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService)
    const tokenService = inject(TokenService)
    const router = inject(Router)

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            if (
                error.status === 401 &&
                tokenService.getRefreshToken() &&
                !req.url.includes('/auth/login') &&
                !req.url.includes('/auth/refresh')
            ) {

                if (isRefreshing) {
                    return throwError(() => error)
                }

                isRefreshing = true

                return authService.refreshToken().pipe(
                    switchMap(res => {
                        isRefreshing = false

                        tokenService.setAccessToken(res.accessToken)

                        const newReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${res.accessToken}`
                            }
                        })

                        return next(newReq)
                    }),
                    catchError(err => {
                        isRefreshing = false
                        tokenService.clear()
                        router.navigate(['/login'])
                        return throwError(() => err)
                    })
                )
            }

            return throwError(() => error)
        })
    )
}

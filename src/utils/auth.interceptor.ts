/**
 * WARNING: This file contains Angular-specific code and is NOT compatible with React Native.
 * This file needs to be rewritten using React Native compatible libraries (e.g., axios interceptors).
 *
 * For React Native, consider using:
 * - axios with interceptors
 * - fetch API with wrapper functions
 * - react-native-ssl-pinning for SSL pinning
 */

// Angular imports - NOT compatible with React Native
// import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpHandler, HttpRequest,HttpResponse } from '@angular/common/http';
// import { TokenStorageService } from '../app/services/token-storage/token-storage.service';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// Placeholder exports to prevent import errors
export const HTTP_INTERCEPTORS = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type HttpEvent<T> = any;
export type HttpInterceptor = any;
export type HttpHandler = any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type HttpRequest<T> = any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type HttpResponse<T> = any;
export type Injectable = any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Observable<T> = any;
export type TokenStorageService = any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

// @Injectable() - Angular decorator, not available in React Native
export class AuthInterceptor {
  // constructor(private token: TokenStorageService) { }
  // TODO: Rewrite for React Native - remove Angular dependencies
  // All implementation code commented out - Angular-specific code not compatible with React Native
  /*
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let allowed_urls_without_ssl_pinning = ['https://api.ipify.org?format=json', './assets/i18n/en.json', './assets/i18n/ar.json'];
    const expectedPublicKey = '04:34:D1:E9:05:F5:8F:2E:96:38:D3:A2:C7:37:48:BB:EA:E9:10:1D:2F:71:FF:94:C2:A0:93:6E:F0:9D:77:20:D8:95:94:39:40:9D:8D:25:F5:21:07:83:4C:44:75:BC:59:AA:9B:F5:9D:3F:17:1E:B6:47:FC:D6:BC:B5:DA:76:CB';
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    // return next.handle(authReq);
    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if(!allowed_urls_without_ssl_pinning.includes(req.url)){
            const serverPublicKey = this.extractServerPublicKey(event);
            // console.log('Server Public Key:', serverPublicKey);
            if (this.isPinningRequired(req)) {
              if (serverPublicKey !== expectedPublicKey) {
                throw new Error('SSL pinning failed. Server public key does not match.');
              }
            }
          }
          // Perform SSL pinning logic here
        }
      })
    );
  }
  private isPinningRequired(request: HttpRequest<any>): boolean {
    // console.log("Req: ",request);
    // Implement your logic here to determine if SSL pinning is required for this URL
    // For example, check if the URL matches a specific pattern
    return false; // Or false based on your requirements
  }

  private extractServerPublicKey(event: HttpResponse<any>): string {
    let publicKey = '';

    // Extract the SSL certificate from the response headers
    const certHeader = event.headers.get('X-SSL-CERT');
    const certHeader2 = event.headers.get('X-Certificate');
    // console.log('event',event.headers);
    if (certHeader) {
      publicKey = certHeader;
      // const cert = this.parseCertificate(certHeader);
      // if (cert) {
      //   // Extract the public key from the certificate
      //   publicKey = cert.publicKey;
      // }
    }

    return publicKey;
  }
  private parseCertificate(certHeader: string): any {
    // Implement parsing logic to extract the certificate details
    // This might involve decoding base64, parsing ASN.1 structure, etc.
    // Return the certificate object with public key
    return { publicKey: 'PUBLIC_KEY' };
  }
  */
}

// Angular provider pattern - not used in React Native
export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];

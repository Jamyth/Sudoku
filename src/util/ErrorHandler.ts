import type { ErrorHandler as ReactShibaErrorHandler, Exception } from "react-shiba";

export class ErrorHandler implements ReactShibaErrorHandler {
    onError(exception: Exception): void {
        alert(exception.message);
        console.info(exception);
    }
}

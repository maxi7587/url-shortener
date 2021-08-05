export class ApiError extends Error {
    name = 'api-error';
    code = 500;

    public constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

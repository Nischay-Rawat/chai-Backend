const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        console.log(req, res, next)
        Promise.resolve(requestHandler(req, res, next)).catch(() => {
            next(err);
            
        })
    }
}
const testHandler = (requestHandler) => {
    console.log(requestHandler)
    return (para) => {
        console.log(para)
    }
}
export { asyncHandler, testHandler }
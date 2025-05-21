import { middlewareChain } from "./middleware/middlewareChain";

export default middlewareChain({
    requireAuth: true,
    allowedRoles: ["admin", "checker"],
});

export const config = {
    matcher: [
        /*
         * ใช้งาน middleware กับทุกเส้นทาง ยกเว้น:
         * - เส้นทางเริ่มต้นด้วย api/public
         * - _next/static, _next/image
         * - favicon.ico
         */
        "/((?!api/public|_next/static|_next/image|favicon.ico).*)",
    ],
};
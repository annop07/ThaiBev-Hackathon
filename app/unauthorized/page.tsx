export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    ไม่มีสิทธิ์เข้าถึง
                </h1>
                <p className="text-gray-600">
                    คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบ
                </p>
            </div>
        </div>
    );
}
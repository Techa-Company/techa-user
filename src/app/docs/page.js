"use client";
import { useEffect } from "react"; // useState حذف شد چون استفاده نشده بود
import DocCard from "../../components/docs/DocCard";
import DocsSkeleton from "../../components/common/DocsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocs } from "../../features/main/docs/docsActions";
import { AlertCircle, FileX } from "lucide-react"; // برای آیکون‌های خطا و خالی بودن

export default function Docs() {
  // اضافه کردن error به دسترسی‌ها
  const { loading, docs, error } = useSelector((state) => state.docs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocs());
  }, [dispatch]); // dispatch به وابستگی‌ها اضافه شد

  // رندر کردن محتوا بر اساس وضعیت‌های مختلف
  const renderContent = () => {
    // ۱. حالت لودینگ
    if (loading) {
      return <DocsSkeleton />;
    }

    // ۲. حالت خطا (اگر API فیل شد)
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-red-50 rounded-2xl mt-10 border border-red-100">
          <AlertCircle size={48} className="mb-4" />
          <h3 className="text-xl font-bold">خطا در دریافت اطلاعات</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(fetchDocs())}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            تلاش مجدد
          </button>
        </div>
      );
    }

    // ۳. حالت لیست خالی (اگر هیچ دیتایی نبود)
    if (!docs || docs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-2xl mt-10 border border-gray-100">
          <FileX size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">هیچ مستنداتی یافت نشد.</p>
        </div>
      );
    }

    // ۴. حالت نمایش موفقیت‌آمیز
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {docs.map((doc, index) => (
          // استفاده از doc.Id به جای index برای پرفورمنس بهتر
          <DocCard key={doc.Id || index} index={index} doc={doc} />
        ))}
      </div>
    );
  };

  return (
    <div className="pt-32 min-h-screen"> {/* min-h-screen برای جلوگیری از پریدن فوتر */}
      <div className="container px-5 xl:px-20 mx-auto pb-20">
        <div className="flex items-center justify-between">
          <h1 className="font-extrabold text-[#042A1B] text-3xl">مستندات ما</h1>
          {/* اینجا می‌توانید فیلتر یا سرچ‌بار اضافه کنید */}
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
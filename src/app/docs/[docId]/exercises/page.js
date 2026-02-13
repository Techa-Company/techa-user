"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../components/common/LoadingSpinner"

export default function RedirectToFirstSession() {
  const { docId } = useParams();
  const router = useRouter();
  const { contents, loading, error } = useSelector((state) => state.exercises);

  // پیدا کردن اولین جلسه معتبر با memoization
  const firstValidSessionId = useMemo(() => {
    if (!contents || contents.length === 0) return null;

    // مرتب‌سازی بر اساس OrderNumber یا CreatedAt (اگر دارید)
    const sorted = [...contents].sort((a, b) => {
      // اگر OrderNumber دارید → اولویت اول
      if (a.OrderNumber !== undefined && b.OrderNumber !== undefined) {
        return a.OrderNumber - b.OrderNumber;
      }
      // fallback به id یا تاریخ
      return a.Id - b.Id;
    });

    // پیدا کردن اولین آیتمی که ParentId دارد (جلسه/تمرین) و فعال است
    const firstSession = sorted.find(
      (item) =>
        item.ParentId !== null &&          // زیرمجموعه‌ای از فصل باشد
        item.ParentId !== undefined &&     // مطمئن شویم فیلد وجود دارد
        item.IsActive !== false            // اگر فیلد فعال/غیرفعال دارید
    );

    return firstSession ? firstSession.Id : null;
  }, [contents]);

  useEffect(() => {
    // فقط وقتی لودینگ تمام شد و دیتا آماده بود
    if (loading) return;

    if (error) {
      // می‌توانید toast یا صفحه خطا نشان دهید
      console.error("خطا در بارگذاری تمرینات:", error);
      return;
    }

    if (!firstValidSessionId) {
      // هیچ جلسه‌ای پیدا نشد
      console.warn("هیچ جلسه تمرینی یافت نشد برای docId:", docId);
      return;
    }

    // ریدایرکت به اولین جلسه معتبر
    router.replace(`/docs/${docId}/exercises/${firstValidSessionId}`);

  }, [loading, error, firstValidSessionId, docId, router]);

  // رندر
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
        <p className="mr-3 text-gray-600">در حال بارگذاری تمرینات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-red-600">
        <p>خطا در بارگذاری داده‌ها</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (!firstValidSessionId) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-gray-600">
        هیچ تمرین یا جلسه‌ای برای این دوره یافت نشد
      </div>
    );
  }

  // در حین ریدایرکت
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingSpinner />
      <p className="mr-3 text-gray-600">در حال انتقال به اولین تمرین...</p>
    </div>
  );
}
"use client"
import { useState } from "react";
import AdminSidebar from "@/components/portal-components/AdminSidebar";
import AddGalleryPhotos from "@/components/portal-components/admin/AddGalleryPhotos";
import MainPageBanner from "@/components/portal-components/admin/MainPageBanner";
import ResultPublishPermission from "@/components/portal-components/admin/ResultPublishPermision";

const Page = () => {
  const [tab, setTab] = useState("gallery");

  const tabs = {
    gallery: <AddGalleryPhotos />,
    mainPageBanner: <MainPageBanner />,
    resultPublishPermission: <ResultPublishPermission />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar setTab={setTab} />
        <main className="flex-1 md:ml-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {tabs[tab] || <p className="text-gray-500">Select a tab from the sidebar</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
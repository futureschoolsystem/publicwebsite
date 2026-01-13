'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Calendar, Tag, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import WhatsAppButton from "@/components/ui/whatsapp-button";


const GalleryPage = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track which image is open in lightbox
  const [lightbox, setLightbox] = useState(null); // { galleryIndex, photoIndex } or null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/gallery-photos");
        setGalleryData(res.data);
      } catch (err) {
        setError("Failed to fetch gallery");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-10 px-4 max-w-6xl mx-auto"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-center mb-6 text-blue-900 drop-shadow-lg"
      >
        Capturing Precious Moments & Celebrating Achievements Across Our Vibrant School Community
      </motion.h1>

      <section className="gallery-section bg-gradient-to-br from-blue-100 via-indigo-50 to-pink-100 rounded-xl shadow-md py-10 px-4 mt-8 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl font-extrabold mb-4 text-yellow-600"
        >
          📸 School Gallery
        </motion.h2>

        <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
          Explore snapshots of fun events, academic milestones, and memorable moments from across our school.
        </p>

        {loading && <SkeletonLoader />}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="text-red-400 mb-4">
              <ImageIcon className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-red-500 font-semibold text-lg">{error}</p>
            <p className="text-gray-600 mt-2">Please try refreshing the page</p>
          </motion.div>
        )}

        {!loading && !error && galleryData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="text-gray-400 mb-4">
              <ImageIcon className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 font-semibold text-lg">No photos available yet</p>
            <p className="text-gray-500 mt-2">Gallery photos will be added soon</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {galleryData.map((item, galleryIndex) => (
            <GalleryCard
              key={item._id}
              item={item}
              galleryIndex={galleryIndex}
              index={galleryIndex}
              onClickPhoto={(photoIndex) =>
                setLightbox({ galleryIndex, photoIndex })
              }
            />
          ))}
        </div>
      </section>

      {lightbox && (
        <ImageLightbox
          galleryItem={galleryData[lightbox.galleryIndex]}
          photoIndex={lightbox.photoIndex}
          onClose={() => setLightbox(null)}
          onPrevious={() =>
            setLightbox((prev) =>
              prev
                ? {
                    ...prev,
                    photoIndex:
                      (prev.photoIndex - 1 + galleryData[prev.galleryIndex].photos.length) %
                      galleryData[prev.galleryIndex].photos.length,
                  }
                : null
            )
          }
          onNext={() =>
            setLightbox((prev) =>
              prev
                ? {
                    ...prev,
                    photoIndex:
                      (prev.photoIndex + 1) % galleryData[prev.galleryIndex].photos.length,
                  }
                : null
            )
          }
        />
      )}
      <WhatsAppButton />
    </motion.div>
  );
};

// Individual gallery card
const GalleryCard = ({ item, galleryIndex, index, onClickPhoto }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-slide photos in card every 4 seconds
  useEffect(() => {
    if (item.photos.length <= 1) return;

    const interval = setInterval(() => {
      if (!imageLoaded) return;
      setCurrentIndex((prev) => (prev + 1) % item.photos.length);
      setImageLoaded(false);
    }, 4000);

    return () => clearInterval(interval);
  }, [item.photos.length, imageLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="relative w-full rounded-lg overflow-hidden shadow-lg hover:shadow-2xl bg-white cursor-pointer group transition-all duration-300"
      onClick={() => onClickPhoto(currentIndex)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={item.photos[currentIndex]}
            alt={item.Heading}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: isHovering ? 1.05 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
        </AnimatePresence>

        {item.photos.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1}/{item.photos.length}
          </div>
        )}

        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-3 border-gray-400 border-t-white rounded-full"
            />
          </div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-t from-black/60 to-transparent text-white absolute bottom-0 left-0 right-0">
        <h3 className="font-semibold text-lg line-clamp-1">{item.Heading}</h3>
        <p className="text-sm line-clamp-2 text-gray-200 mt-1">{item.caption}</p>
        <div className="flex items-center gap-4 text-xs mt-3 text-gray-300">
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {item.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(item.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        className="absolute top-2 left-2"
      >
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg">
          {item.category}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Lightbox component
const ImageLightbox = ({ galleryItem, photoIndex, onClose, onPrevious, onNext }) => {
  const hasPrevious = galleryItem.photos.length > 1;
  const hasNext = galleryItem.photos.length > 1;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrevious) onPrevious();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      {/* Image Counter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
      >
        {photoIndex + 1} / {galleryItem.photos.length}
      </motion.div>

      {/* Previous Button */}
      <AnimatePresence>
        {hasPrevious && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <AnimatePresence>
        {hasNext && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={photoIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          src={galleryItem.photos[photoIndex]}
          alt={galleryItem.Heading}
          className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-6 text-center max-w-2xl"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {galleryItem.Heading}
          </h2>
          <p className="text-white/80 mb-4 leading-relaxed">
            {galleryItem.caption}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Tag className="w-4 h-4" />
              {galleryItem.category}
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              {new Date(galleryItem.date).toLocaleDateString()}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="w-full rounded-lg overflow-hidden shadow-md bg-white"
        >
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]"
          />
          <div className="p-4 space-y-3">
            <motion.div className="h-4 bg-gray-200 rounded w-3/4" />
            <motion.div className="h-3 bg-gray-200 rounded w-full" />
            <motion.div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryPage;

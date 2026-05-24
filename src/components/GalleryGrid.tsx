import React, { useState } from "react";
import { GALLERY_ITEMS } from "../data";
import { Maximize2, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function GalleryGrid() {
  const [filter, setFilter] = useState<string>("All");
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  const categories = ["All", "Equipment", "Lifting", "Cardio", "CrossFit", "Yoga", "Wellness"];

  const filteredItems = filter === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category.toLowerCase() === filter.toLowerCase());

  const currentImageIndex = GALLERY_ITEMS.findIndex(item => item.id === activeImageId);
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setActiveImageId(GALLERY_ITEMS[currentImageIndex - 1].id);
    } else {
      setActiveImageId(GALLERY_ITEMS[GALLERY_ITEMS.length - 1].id); // Loop to end
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < GALLERY_ITEMS.length - 1) {
      setActiveImageId(GALLERY_ITEMS[currentImageIndex + 1].id);
    } else {
      setActiveImageId(GALLERY_ITEMS[0].id); // Loop to start
    }
  };

  const activeImage = GALLERY_ITEMS.find(item => item.id === activeImageId);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        <div className="flex items-center gap-1.5 text-zinc-500 mr-2 border-r border-white/5 pr-3 text-xs uppercase tracking-widest font-bold">
          <Filter className="w-3.5 h-3.5" /> Filter
        </div>
        
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-tab-${cat.toLowerCase()}`}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer ${
              filter === cat
                ? "bg-titan-red text-white shadow-lg shadow-titan-red/20 font-bold"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`gallery-item-${item.id}`}
            onClick={() => setActiveImageId(item.id)}
            className="group relative h-[260px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-zinc-950 shine-hover scale-on-hover hover:border-titan-red/20 transition-all duration-500"
          >
            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
            
            {/* Actual Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
            />

            {/* Bottom info layout */}
            <div className="absolute bottom-0 left-0 w-full p-5 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[10px] font-bold text-titan-orange uppercase tracking-widest px-2.5 py-1 bg-titan-orange/10 border border-titan-orange/20 rounded-full">
                {item.category}
              </span>
              <h4 className="font-display text-white font-bold text-base md:text-lg tracking-tight mt-3 group-hover:text-titan-red transition-colors duration-300">
                {item.title}
              </h4>
              
              <div className="flex items-center gap-1 text-xs text-titan-red opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2 font-mono">
                View Max Resolution <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-zinc-950/20 text-zinc-500">
          No premium gallery cards match this specific category.
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImageId && activeImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 animate-fadein backdrop-blur-md"
          onClick={() => setActiveImageId(null)}
        >
          {/* Close button */}
          <button 
            id="gallery-close-btn"
            onClick={() => setActiveImageId(null)}
            className="absolute top-6 right-6 p-3 bg-zinc-900/60 hover:bg-titan-red text-zinc-400 hover:text-white rounded-full transition-all cursor-pointer z-50 border border-white/5"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation hooks */}
          <button
            id="gallery-prev-btn"
            onClick={handlePrev}
            className="absolute left-4 md:left-8 p-3.5 bg-zinc-900/60 hover:bg-zinc-800 text-white rounded-full transition-all cursor-pointer z-40 border border-white/5 hover:border-titan-red/30"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            id="gallery-next-btn"
            onClick={handleNext}
            className="absolute right-4 md:right-8 p-3.5 bg-zinc-900/60 hover:bg-zinc-800 text-white rounded-full transition-all cursor-pointer z-40 border border-white/5 hover:border-titan-red/30"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Maximize Frame block */}
          <div 
            className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl border border-white/10 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            {/* Item metadata description at footer */}
            <div className="mt-4 text-center max-w-xl space-y-2 px-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-titan-orange font-mono">
                {activeImage.category} Focus
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight leading-tight">
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

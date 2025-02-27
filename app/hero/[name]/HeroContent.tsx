'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Camera, BookOpen, Medal, Milestone, Users, ChevronRight, ChevronLeft } from "lucide-react";
import { FallenHero } from "@/types/fallen-hero";
import { InfoTab } from "@/components/hero-tabs/InfoTab";
import { WorldTab } from "@/components/hero-tabs/WorldTab";
import { MilestonesTab } from "@/components/hero-tabs/MilestonesTab";
import { ImpactTab } from "@/components/hero-tabs/ImpactTab";
import { ServiceTab } from "@/components/hero-tabs/ServiceTab";
import { StoriesTab } from "@/components/hero-tabs/StoriesTab";
import { GalleryTab } from "@/components/hero-tabs/GalleryTab";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";

interface HeroContentProps {
    params: {
        name: string;
    };
}

export function HeroContent({ params }: HeroContentProps) {
    const [hero, setHero] = useState<FallenHero | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("info");
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [scrollPosition, setScrollPosition] = useState({ left: false, right: true });
    const tabsListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchHero = async () => {
            if (!params.name || params.name === 'undefined') {
                setError('Invalid hero ID');
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);

            try {
                const decodedName = decodeURIComponent(params.name);
                const response = await fetch(`/api/fallen/${decodedName}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch hero data');
                }

                const data = await response.json();
                setHero(data);
            } catch (error) {
                console.error('Error fetching hero:', error);
                setError(error instanceof Error ? error.message : 'Failed to load hero data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHero();
    }, [params.name]);

    // Check scroll position to update scroll indicators
    useEffect(() => {
        const checkScrollPosition = () => {
            if (tabsListRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
                const isScrollLeft = scrollLeft > 5;
                const isScrollRight = scrollLeft < scrollWidth - clientWidth - 5;
                
                setScrollPosition({ 
                    left: isScrollLeft, 
                    right: isScrollRight 
                });
            }
        };

        // Hide scroll indicator after a few seconds
        const timer = setTimeout(() => {
            setShowScrollIndicator(false);
        }, 6000);

        // Initial check
        checkScrollPosition();
        
        // Add scroll event listener
        const tabsListElement = tabsListRef.current;
        if (tabsListElement) {
            tabsListElement.addEventListener('scroll', checkScrollPosition);
        }
        
        // Cleanup
        return () => {
            clearTimeout(timer);
            if (tabsListElement) {
                tabsListElement.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, [isLoading]);

    // Animation variants for tab content
    const tabContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
    };

    // Scroll tabs left or right
    const scrollTabs = (direction: 'left' | 'right') => {
        if (tabsListRef.current) {
            const scrollAmount = 200; // Pixels to scroll
            const newPosition = direction === 'left' 
                ? tabsListRef.current.scrollLeft - scrollAmount
                : tabsListRef.current.scrollLeft + scrollAmount;
            
            tabsListRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="p-4 md:p-8">
                <div className="text-red-600 text-lg md:text-xl">שגיאה: {error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition-colors duration-300"
                >
                    נסה שוב
                </button>
            </div>
        );
    }

    if (!hero) {
        return (
            <div className="text-center p-4 md:p-8">
                <div className="text-lg md:text-xl">לא נמצא מידע על הגיבור המבוקש</div>
            </div>
        );
    }

    // Function to render tab content with animation
    const renderTabContent = (tabValue, Component) => (
        <TabsContent value={tabValue} className="outline-none text-center">
            <AnimatePresence mode="wait">
                {activeTab === tabValue && (
                    <motion.div
                        key={tabValue}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={tabContentVariants}
                        className="focus:outline-none"
                    >
                        <Component hero={hero} />
                    </motion.div>
                )}
            </AnimatePresence>
        </TabsContent>
    );

    return (
        <div className="text-lime-600 max-w-6xl mx-auto p-4 md:p-8">
            <header className="text-center mb-6 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">הכירו את {hero.fullName}</h1>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="relative mb-6 md:mb-8">
                    {/* Left scroll button */}
                    {scrollPosition.left && (
                        <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md text-lime-600 hover:bg-white md:hidden"
                            onClick={() => scrollTabs('left')}
                            aria-label="Scroll tabs left"
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                    )}
                    
                    {/* Right scroll button */}
                    {scrollPosition.right && (
                        <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md text-lime-600 hover:bg-white md:hidden"
                            onClick={() => scrollTabs('right')}
                            aria-label="Scroll tabs right"
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    )}
                    
                    {/* Scroll indicator tooltip */}
                    {showScrollIndicator && scrollPosition.right && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-12 top-1/2 -translate-y-1/2 z-10 bg-lime-100 text-lime-800 text-sm px-3 py-1 rounded-lg shadow-md md:hidden"
                        >
                            <div className="flex items-center gap-1">
                                <span>החלק לצפייה בעוד לשוניות</span>
                                <ChevronLeft size={16} />
                            </div>
                        </motion.div>
                    )}

                    <div 
                        ref={tabsListRef}
                        className="overflow-x-auto pb-2 scrollbar-hide"
                    >
                        <TabsList className="flex md:grid w-full md:grid-cols-3 lg:grid-cols-7 gap-2 min-w-max">
                            {[
                                { value: "info", icon: <Heart className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "מידע אישי" },
                                { value: "milestones", icon: <Milestone className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "אבני דרך" },
                                { value: "world", icon: <Star className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "העולם שלו/ה" },
                                { value: "impact", icon: <Users className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "השפעה על אחרים" },
                                { value: "service", icon: <Medal className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "שירות צבאי" },
                                { value: "stories", icon: <BookOpen className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "סיפורים וזכרונות" },
                                { value: "gallery", icon: <Camera className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "גלריה" }
                            ].map(tab => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={`whitespace-nowrap transition-all duration-300 ease-in-out text-sm md:text-base px-3 py-2 md:px-4 md:py-2 ${
                                        activeTab === tab.value 
                                            ? "bg-lime-500 text-white shadow-md transform scale-105" 
                                            : "text-lime-600 hover:bg-lime-100"
                                    }`}
                                >
                                    <span className="flex items-center">
                                        {tab.icon} {tab.label}
                                    </span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                    
                    {/* Gradient overlay to indicate more content */}
                    {scrollPosition.right && (
                        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
                    )}
                    {scrollPosition.left && (
                        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden"></div>
                    )}
                </div>

                {renderTabContent("info", InfoTab)}
                {renderTabContent("milestones", MilestonesTab)}
                {renderTabContent("world", WorldTab)}
                {renderTabContent("impact", ImpactTab)}
                {renderTabContent("service", ServiceTab)}
                {renderTabContent("stories", StoriesTab)}
                {renderTabContent("gallery", GalleryTab)}
            </Tabs>
        </div>
    );
}
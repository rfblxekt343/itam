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
import { useSwipeable } from "react-swipeable"; // You'll need to install this package

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
    const [scrollPosition, setScrollPosition] = useState({ left: false, right: true });
    const tabsListRef = useRef<HTMLDivElement>(null);
    const tabContentRef = useRef<HTMLDivElement>(null);
    const [isTabsSticky, setIsTabsSticky] = useState(false);

    // Define tab configuration in one place for easy management
    const tabConfig = [
        { value: "info", icon: <Heart className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "מידע אישי", ariaLabel: "מידע אישי" },
        { value: "milestones", icon: <Milestone className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "אבני דרך", ariaLabel: "אבני דרך" },
        { value: "world", icon: <Star className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "העולם שלו/ה", ariaLabel: "העולם של הגיבור" },
        { value: "impact", icon: <Users className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "השפעה על אחרים", ariaLabel: "השפעה על אחרים" },
        { value: "gallery", icon: <Camera className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "גלריה", ariaLabel: "גלריית תמונות" },
        { value: "stories", icon: <BookOpen className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "סיפורים וזכרונות", ariaLabel: "סיפורים וזכרונות" },
        { value: "service", icon: <Medal className="mr-1 h-4 w-4 md:h-5 md:w-5" />, label: "שירות צבאי", ariaLabel: "פרטי שירות צבאי" },
    ];

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

        // Initial check
        checkScrollPosition();

        // Add scroll event listener
        const tabsListElement = tabsListRef.current;
        if (tabsListElement) {
            tabsListElement.addEventListener('scroll', checkScrollPosition);
            
            // Cleanup on unmount
            return () => {
                tabsListElement.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, [isLoading]);

    // Handle sticky tabs
    useEffect(() => {
        const handleScroll = () => {
            if (tabsListRef.current) {
                const { top } = tabsListRef.current.getBoundingClientRect();
                setIsTabsSticky(top <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Swipe handlers for mobile navigation
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => navigateTab('next'),
        onSwipedRight: () => navigateTab('prev'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: false
    });

    // Navigate to previous or next tab
    const navigateTab = (direction: 'prev' | 'next') => {
        const currentIndex = tabConfig.findIndex(tab => tab.value === activeTab);
        let newIndex;
        
        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabConfig.length - 1;
        } else {
            newIndex = currentIndex < tabConfig.length - 1 ? currentIndex + 1 : 0;
        }
        
        setActiveTab(tabConfig[newIndex].value);
        
        // Scroll the tab into view
        if (tabsListRef.current) {
            const tabElements = tabsListRef.current.querySelectorAll('[role="tab"]');
            if (tabElements[newIndex]) {
                tabElements[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    };

    // Animation variants for tab content
    const tabContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
    };

    // Tab trigger animation variants
    const tabTriggerVariants = {
        inactive: { scale: 1 },
        active: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }
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

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, tabIndex: number) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = tabIndex > 0 ? tabIndex - 1 : tabConfig.length - 1;
            setActiveTab(tabConfig[prevIndex].value);
            const tabElements = tabsListRef.current?.querySelectorAll('[role="tab"]');
            if (tabElements && tabElements[prevIndex]) {
                (tabElements[prevIndex] as HTMLElement).focus();
            }
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = tabIndex < tabConfig.length - 1 ? tabIndex + 1 : 0;
            setActiveTab(tabConfig[nextIndex].value);
            const tabElements = tabsListRef.current?.querySelectorAll('[role="tab"]');
            if (tabElements && tabElements[nextIndex]) {
                (tabElements[nextIndex] as HTMLElement).focus();
            }
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
    const renderTabContent = (tabValue: string, Component: React.ComponentType<{hero: FallenHero}>) => (
        <TabsContent value={tabValue} className="outline-none text-center" role="tabpanel" aria-labelledby={`tab-${tabValue}`}>
            <AnimatePresence mode="wait">
                {activeTab === tabValue && (
                    <motion.div
                        key={tabValue}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={tabContentVariants}
                        className="focus:outline-none"
                        ref={tabContentRef}
                    >
                        <Component hero={hero} />
                    </motion.div>
                )}
            </AnimatePresence>
        </TabsContent>
    );

    return (
        <div className="text-lime-600 max-w-6xl mx-auto p-4 md:p-8" {...swipeHandlers}>
            <header className="text-center mb-6 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">הכירו את {hero.fullName}</h1>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div 
                    className={`relative mb-6 md:mb-8 ${
                        isTabsSticky ? "sticky top-0 z-20 bg-white/95 shadow-md py-2 transition-all duration-300 backdrop-blur-sm" : ""
                    }`}
                >
                    {/* Left scroll button - enhanced for better visibility */}
                    {scrollPosition.left && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md text-lime-600 hover:bg-lime-50 hover:text-lime-700 transition-all duration-200 md:hidden"
                            onClick={() => scrollTabs('left')}
                            aria-label="גלול לשמאל"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>
                    )}

                    {/* Right scroll button - enhanced for better visibility */}
                    {scrollPosition.right && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md text-lime-600 hover:bg-lime-50 hover:text-lime-700 transition-all duration-200 md:hidden"
                            onClick={() => scrollTabs('right')}
                            aria-label="גלול לימין"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    )}

                    <div
                        ref={tabsListRef}
                        className="overflow-x-auto pb-2 scrollbar-hide"
                        role="tablist"
                        aria-label="מידע על הגיבור"
                    >
                        <TabsList className="flex md:grid w-full md:grid-cols-3 lg:grid-cols-7 gap-2 min-w-max rounded-[20px]">
                            {tabConfig.map((tab, index) => (
                                <motion.div
                                    key={tab.value}
                                    variants={tabTriggerVariants}
                                    initial="inactive"
                                    animate={activeTab === tab.value ? "active" : "inactive"}
                                >
                                    <TabsTrigger
                                        value={tab.value}
                                        id={`tab-${tab.value}`}
                                        role="tab"
                                        aria-selected={activeTab === tab.value}
                                        aria-controls={`tabpanel-${tab.value}`}
                                        aria-label={tab.ariaLabel}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className={`
                                            whitespace-nowrap transition-all duration-300 ease-in-out
                                            text-sm md:text-base px-3 py-2 md:px-4 md:py-2
                                            focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2
                                            ${activeTab === tab.value
                                                ? "bg-lime-500 text-white shadow-md"
                                                : "text-lime-600 hover:bg-lime-100 hover:text-lime-700 active:bg-lime-200"
                                            }
                                        `}
                                    >
                                        <span className="flex items-center">
                                            {tab.icon} {tab.label}
                                        </span>
                                    </TabsTrigger>
                                </motion.div>
                            ))}
                        </TabsList>
                    </div>

                    {/* Gradient overlay to indicate more content */}
                    {scrollPosition.right && (
                        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
                    )}
                    {scrollPosition.left && (
                        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden"></div>
                    )}
                </div>

                {/* Mobile tab navigation indicators */}
                <div className="flex justify-center mb-4 md:hidden">
                    {tabConfig.map((tab, index) => (
                        <button
                            key={`indicator-${tab.value}`}
                            aria-label={`עבור ללשונית ${tab.label}`}
                            className={`w-2 h-2 mx-1 rounded-full transition-colors duration-300 ${
                                activeTab === tab.value ? "bg-lime-500" : "bg-lime-200"
                            }`}
                            onClick={() => setActiveTab(tab.value)}
                        />
                    ))}
                </div>

                <div className="relative">
                    {/* Swipe instruction - shows briefly on mobile */}
                    <motion.div 
                        className="md:hidden text-center text-sm text-lime-600 mb-4"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        החלק ימינה או שמאלה כדי לנווט בין הלשוניות
                    </motion.div>

                    {renderTabContent("info", InfoTab)}
                    {renderTabContent("milestones", MilestonesTab)}
                    {renderTabContent("world", WorldTab)}
                    {renderTabContent("impact", ImpactTab)}
                    {renderTabContent("service", ServiceTab)}
                    {renderTabContent("stories", StoriesTab)}
                    {renderTabContent("gallery", GalleryTab)}
                </div>
            </Tabs>
        </div>
    );
}
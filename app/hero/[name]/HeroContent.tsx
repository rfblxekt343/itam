// app/hero/[name]/HeroContent.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Camera, BookOpen, Medal, Milestone, Users } from "lucide-react";
import { FallenHero } from "@/types/fallen-hero";
import { InfoTab } from "@/components/hero-tabs/InfoTab";
import { WorldTab } from "@/components/hero-tabs/WorldTab";
import { MilestonesTab } from "@/components/hero-tabs/MilestonesTab";
import { ImpactTab } from "@/components/hero-tabs/ImpactTab";
import { ServiceTab } from "@/components/hero-tabs/ServiceTab";
import { StoriesTab } from "@/components/hero-tabs/StoriesTab";
import { GalleryTab } from "@/components/hero-tabs/GalleryTab";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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

    useEffect(() => {
        const fetchHero = async () => {
            // Add validation before making the API call
            if (!params.name || params.name === 'undefined') {
                setError('Invalid hero ID');
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/fallen/${params.name}`);

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

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="text-center p-8">
                <div className="text-red-600 text-xl">שגיאה: {error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    נסה שוב
                </button>
            </div>
        );
    }

    if (!hero) {
        return (
            <div className="text-center p-8">
                <div className="text-xl">לא נמצא מידע על הגיבור המבוקש</div>
            </div>
        );
    }

    return (
        <div className="text-lime-600 max-w-6xl mx-auto p-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">הכירו את {hero.fullName}</h1>
            </header>


            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                    <TabsTrigger value="info">
                        <Heart className="mr-2" /> מידע אישי
                    </TabsTrigger>
                    <TabsTrigger value="milestones">
                        <Milestone className="mr-2" /> אבני דרך
                    </TabsTrigger>
                    <TabsTrigger value="world">
                        <Star className="mr-2" /> העולם שלו/ה
                    </TabsTrigger>
                    <TabsTrigger value="impact">
                        <Users className="mr-2" /> השפעה על אחרים
                    </TabsTrigger>
                    <TabsTrigger value="service">
                        <Medal className="mr-2" /> שירות צבאי
                    </TabsTrigger>
                    <TabsTrigger value="stories">
                        <BookOpen className="mr-2" /> סיפורים וזכרונות
                    </TabsTrigger>
                    <TabsTrigger value="gallery">
                        <Camera className="mr-2" /> גלריה
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                    <InfoTab hero={hero} />
                </TabsContent>
                <TabsContent value="milestones">
                    <MilestonesTab hero={hero} />
                </TabsContent>
                <TabsContent value="world">
                    <WorldTab hero={hero} />
                </TabsContent>
                <TabsContent value="impact">
                    <ImpactTab hero={hero} />
                </TabsContent>
                <TabsContent value="service">
                    <ServiceTab hero={hero} />
                </TabsContent>
                <TabsContent value="stories">
                    <StoriesTab hero={hero} />
                </TabsContent>
                <TabsContent value="gallery">
                    <GalleryTab hero={hero} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
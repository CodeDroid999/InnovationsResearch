import React from "react";

import CardsSection from '../../components/ClientUI/cards-section';
import ClientLayout from '../../components/ClientUI/ClientLayout';
import TopNavigation from '../../components/ClientUI/top-nav';

export default function Index() {
    return (
        <ClientLayout>
            <div className="flex flex-col">
                <TopNavigation />
                <CardsSection />
            </div>
        </ClientLayout>
    )
}

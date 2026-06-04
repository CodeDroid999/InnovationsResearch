import React from "react";
import ClientLayout from '../../components/ClientUI/ClientLayout';
import TopNavigation from '../../components/ClientUI/top-nav';
import CardsSection from '../../components/ClientUI/cards-section';

export default function View() {
    return (
        <ClientLayout>
            <div className="flex flex-col">
                <TopNavigation />
                <CardsSection />
            </div>
        </ClientLayout>
    )
}

import React from 'react';
import Select from 'react-select';

interface ProductTitleSelectorProps {
    productType: string;
    value: string;
    onChange: (selectedProductTitle: string) => void;
}

const ProductTitleSelector: React.FC<ProductTitleSelectorProps> = ({ productType, value, onChange }) => {
    let options: { value: string; label: string }[] = [];

    switch (productType) { // Use productType instead of productTitle for switch condition
        case 'USA Bank Logs':
            options = [
                { value: 'Chase Bank', label: 'Chase Bank' },
                { value: 'PNC Bank', label: 'PNC Bank' },
                { value: 'RBFCU BANK', label: 'RBFCU BANK' },
                { value: 'Woodforest Bank', label: 'Woodforest Bank' },
                { value: 'Citi Bank', label: 'Citi Bank' },
                { value: 'Boa Bank', label: 'Boa Bank' },
                { value: 'Suntrust Bank', label: 'Suntrust Bank' },
                { value: 'M&T Bank', label: 'M&T Bank' },
                { value: 'WellsFargo Bank', label: 'WellsFargo Bank' },
                { value: 'Chime', label: 'Chime' },
            ];
            break;
        case 'Canadian Bank Logs':
            options = [
                { value: 'SCOTIA Bank', label: 'SCOTIA Bank' },
                { value: 'CIBC BANK', label: 'CIBC BANK' },
                { value: 'RBC BANK', label: 'RBC BANK' },
                { value: 'TD BANK', label: 'TD BANK' },
            ];
            break;
        case 'Verified Accounts':
            options = [
                { value: 'BLOCKCHAIN', label: 'BLOCKCHAIN' },
                { value: 'COIN BASE', label: 'COIN BASE' },
            ];
            break;
        case 'PAYPAL Bank':
            options = [
                { value: 'Paypal', label: 'Paypal' },
                { value: 'CashApp', label: 'CashApp' },
            ];
            break;
        case 'CASHAPP Bank':
            options = [
                { value: 'Paypal', label: 'Paypal' },
                { value: 'CashApp', label: 'CashApp' },
            ];
            break;
        case 'Darklogs':
            options = [
                { value: 'Shopwithscript ', label: 'Shopwithsript' },
                { value: 'Clonecards', label: 'Clonecards' },
                { value: 'VPN', label: 'VPN' },
                { value: 'RDP', label: 'RDP' },
            ];
            break;
        default:
            options = [{ value: 'Other', label: 'Other' }];
    }

    const handleChange = (selectedOption: { value: string; label: string }) => {
        onChange(selectedOption.value);
    };

    return (
        <Select
            options={options}
            value={{ value: value, label: value }} // Set value to the provided value prop
            onChange={handleChange}
            placeholder="Select a product title"
            className='text-gray-500'
        />
    );
};

export default ProductTitleSelector;

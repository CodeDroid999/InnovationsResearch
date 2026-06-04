import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import ProductTypeList from './ProductConfig/ProductTypeList';

interface ProductTypeSelectorProps {
    productType: string;
    setProductType: React.Dispatch<React.SetStateAction<string>>;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ productType, setProductType }) => {
    const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

    const options = useMemo(() => ProductTypeList.map(type => ({ label: type, value: type })), []);

    const handleChange = (selectedOption: { label: string; value: string } | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setProductType(selectedOption.value);
        } else {
            setProductType('');
        }
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder="Select type"
        />
    );
};

export default ProductTypeSelector;

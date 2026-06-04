import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import ProductAccountTypeList from './ProductConfig/ProductAccountTypeList';

interface ProductAccountTypeSelectorProps {
    productAccountType: string;
    setProductAccountType: React.Dispatch<React.SetStateAction<string>>;
}

const ProductAccountTypeSelector: React.FC<ProductAccountTypeSelectorProps> = ({ productAccountType, setProductAccountType }) => {
    const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

    const options = useMemo(() => ProductAccountTypeList.map(type => ({ label: type, value: type })), []);

    const handleChange = (selectedOption: { label: string; value: string } | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setProductAccountType(selectedOption.value);
        } else {
            setProductAccountType('');
        }
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder="Select account type"
        />
    );
};

export default ProductAccountTypeSelector;

import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import GenderTypeList from './ProductConfig/GenderTypeList';

interface GenderSelectorProps {
    genderType: string;
    setGenderType: React.Dispatch<React.SetStateAction<string>>;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ genderType, setGenderType }) => {
    const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

    const options = useMemo(() => GenderTypeList.map(type => ({ label: type, value: type })), []);

    const handleChange = (selectedOption: { label: string; value: string } | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setGenderType(selectedOption.value);
        } else {
            setGenderType('');
        }
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder="Select Gender"
        />
    );
};

export default GenderSelector;

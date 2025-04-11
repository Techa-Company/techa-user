// components/AccordionList.js
import { useState } from 'react';
import AccordionItem from './AccordionItem';

const AccordionList = ({ items }) => {
    const [openAccordion, setOpenAccordion] = useState(-1);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    return (
        <div className="mt-5">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openAccordion === index}
                    onClick={() => toggleAccordion(index)}
                />
            ))}
        </div>
    );
};

export default AccordionList;

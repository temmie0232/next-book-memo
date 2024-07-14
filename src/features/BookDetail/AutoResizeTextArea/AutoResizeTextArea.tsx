import React, { useRef, useEffect } from 'react';

interface AutoResizeTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const AutoResizeTextArea: React.FC<AutoResizeTextAreaProps> = (props) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }, [props.value]);

    return (
        <textarea
            {...props}
            ref={textAreaRef}
            rows={1}
        />
    );
};

export default AutoResizeTextArea;
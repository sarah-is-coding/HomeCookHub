import React from "react";

interface InstructionListProps {
    steps: Object;
}

const InstructionList: React.FC<InstructionListProps> = (props) => {
    const stepMap = new Map(Object.entries(props.steps));

    return(
    <div>
        <p><b>Instructions:</b></p>
        <ol>
            {
                Array.from(Object.keys(props.steps)).map((key: string) => {
                return(<li key={key}>{stepMap.get(key)}</li>)
            })}
        </ol>
    </div>
    );
};

export default InstructionList;
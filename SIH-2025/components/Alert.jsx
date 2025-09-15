import React from "react";

export default function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const typeStyles = {
        success: "bg-green-100 border-green-500 text-green-700",
        error: "bg-red-100 border-red-500 text-red-700",
        warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
        info: "bg-blue-100 border-blue-500 text-blue-700",
    };

    return (
        <div className="h-[50px]">
            {props.alert && (
                <div
                    className={`border-l-4 p-4 rounded-md shadow-sm ${typeStyles[props.alert.type] || "bg-gray-100 border-gray-500 text-gray-700"
                        }`}
                    role="alert"
                >
                    <strong className="font-semibold">
                        {capitalize(props.alert.type)}
                    </strong>
                    : {props.alert.msg}
                </div>
            )}
        </div>
    );
}
